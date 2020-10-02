const router = require('express').Router()
const orderController = require('../controllers/OrderController')
const auth = require('../middleware/auth')

router.post('/', auth, orderController.create)
router.post('/webhook', orderController.update)
router.get('/', auth, orderController.show)
router.get('/:id', auth, orderController.find)
router.delete('/:id', auth, orderController.delete)

module.exports = router