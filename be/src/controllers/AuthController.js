require('dotenv').config()
const models = require('../models')
const response = require('../helpers/response')
const jwt = require('jsonwebtoken')
const bycrypt = require('bcrypt')
const e = require('express')

class Controller{
    static async logIn (req, res) {
        // const { data } = req.body
        const secret = process.env.secret
        try {
            const user = await models.User.findOne({
                where: {
                    username: req.body.data.username
                }
            })
            const admin = await models.Admin.findOne({
                where: {
                    username: req.body.data.username
                }
            })
            
            if (!user && !admin) {
                return res
                    .status(422)
                    .json(response('Fail', 'Username and password not found'))
            }

            if (user) {
                if (bycrypt.compareSync(req.body.data.password, user.password)) {
                    const token = jwt.sign(user.id, secret)
                    return res
                        .status(200)
                        .json(response('Success', 'Login Success', { token, id: user.id, type: user.type }))
                }

                return res
                    .status(422)
                    .json(response('Fail', 'Username and password not found'))
            }

            if (admin) {
                if (bycrypt.compareSync(req.body.data.password, admin.password)) {
                    const token = jwt.sign(admin.id, secret)
                    return res
                        .status(200)
                        .json(response('Success', 'Login Success', { token, id: admin.id, type: admin.type }))
                }

                return res
                    .status(422)
                    .json(response('Fail', 'Username and password not found'))
            }

        } catch (error) {
            return res
                .status(500)
                .json(response('Fail', error.message))
        }
    }

    static async register(req, res) {
        try {
            const username = await models.User.findOne({
                where: {
                    username: req.body.data.username,
                }
            })

            const email = await models.User.findOne({
                where: {
                    email: req.body.data.email
                }
            })

            const phone = await models.User.findOne({
                where: {
                    phoneNumber: req.body.data.phone_number
                }
            })

            if (username) {
                return res
                    .status(422)
                    .json(response('Fail', 'Username has been taken'))
            }

            if (email) {
                return res
                    .status(422)
                    .json(response('Fail', 'Email has been taken'))
            }

            if (phone) {
                return res
                    .status(422)
                    .json(response('Fail', 'Phone number has been taken'))
            }

            await models.User.create({
                firstName: req.body.data.first_name,
                lastName: req.body.data.last_name,
                email: req.body.data.email,
                username: req.body.data.username,
                phoneNumber: req.body.data.phone_number,
                salt: bycrypt.genSaltSync(10),
                password: bycrypt.hashSync(req.body.data.password, bycrypt.genSaltSync(10))
            })

            return res
                .status(200)
                .json(response('Success', 'Register Success'))
        } catch (error) {
            return res
                .status(500)
                .json(response('Fail', error.message))
        }
    }
}

module.exports = Controller