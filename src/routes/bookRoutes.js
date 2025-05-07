const express = require('express')
const router = express.Router()
const controllers = require('../controllers/bookController')

router.get('/', controllers.getAllBooks)
router.get('/:id', controllers.getBookById)
router.post('/', controllers.createBook)
router.put('/:id', controllers.updateBook)
router.delete('/:id', controllers.deleteBook)

module.exports = router