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

exports.validationCreate = [
    check('adminId', 'Your session is over. please login').exists().optional(),
    check('userId', 'Your session is over. please login').exists().optional(),
    check('addressName', 'Address Name is required').notEmpty(),
    check('city', 'City is required').notEmpty().isAlpha().withMessage('City must be alphabetic'), 
    check('zipcode', 'Zip code is requeired').notEmpty(),
    check('address', 'Address is required').notEmpty().isLength({ min: 10 }),
]