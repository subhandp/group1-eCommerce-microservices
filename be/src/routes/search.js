const router = require('express').Router()
const searchController = require('../controllers/SearchController')

router.get('/', searchController.find)

module.exports = router