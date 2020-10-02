const router = require('express').Router()
const DiscountController = require("../controllers/DiscountController")

router.post('/', DiscountController.create)
router.get('/', DiscountController.show)
router.put('/:id', DiscountController.update)
router.get('/:id', DiscountController.find)
router.delete('/:id', DiscountController.delete)

module.exports = router