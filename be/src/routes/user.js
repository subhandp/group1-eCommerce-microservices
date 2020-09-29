const router = require('express').Router()
const UserController = require("../controllers/UserController")

router.put('/:id', UserController.update)
router.get('/:id', UserController.find)

module.exports = router
