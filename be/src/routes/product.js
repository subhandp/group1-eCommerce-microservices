const router = require('express').Router()
const ProducController = require("../controllers/ProductController")

router.post('/', ProducController.create)
router.get('/', ProducController.show)
router.put('/:id', ProducController.update)
router.get('/:id', ProducController.find)
router.delete('/:id', ProducController.delete)

module.exports = router