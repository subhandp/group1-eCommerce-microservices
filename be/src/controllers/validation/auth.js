const { check, validationResult } = require('express-validator');

exports.runValidation = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({
            status: falsse,
            message: errors.array()[0].msg
        })
    }
    next()
}

exports.validationLogin = [
    check('username', "username is required").notEmpty(),
    check('password', "password is required").notEmpty()
]

