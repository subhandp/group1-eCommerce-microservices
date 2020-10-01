const router = require('express').Router()
const AuthController = require("../controllers/AuthController")
const { runValidation, validationLogin } = require("../controllers/validation/auth")

router.post('/register', AuthController.register)
router.post('/login', runValidation, validationLogin, AuthController.logIn)

module.exports = router
