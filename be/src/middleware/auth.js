require('dotenv').config()
const jwt = require('jsonwebtoken')
// const models = require('../models')
const response = require('../helpers/response')

module.exports = async (req, res, next) => {
    if (!req.headers['authorization']) res.status(401).json(response('fail', 'unauthenticated'))

    const token = req.headers['authorization'].split(' ')[1]
    try {
        jwt.verify(token, process.env.secret, function(error, result) {
            // console.log('hey')   
            if(error) {
                return true
            }
            req.token = token
            req.user_id = jwt.decode(token, process.env.secret)
            return next()
        })
        jwt.verify(token, process.env.secret_admin, function(error, result) {
           if(error) {
               return false
           }
           req.token = token
           req.admin_id = jwt.decode(token, process.env.secret_admin)
           return next()
        })
        // const verify = jwt.verify(token, process.env.secret)
        // const verify_adm = jwt.verify(token, process.env.secret_admin)
        // if (verify) {
        //     req.token = token
        //     req.user_id = jwt.decode(token, process.env.secret)
        //     return next()
        // }
        // if (verify_adm) {
        //     req.token = token
        //     req.admin_id = jwt.decode(token, process.env.secret_admin)
        //     return next()
        // }
    } catch (error) {
        return res.status(500).json(response('Fail', 'Invalid token'))
    }
}