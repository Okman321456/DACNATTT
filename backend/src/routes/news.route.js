const express = require('express');
const newsController = require('../controllers/news.controller')
const upLoadImage = require('../middlewares/fileUpload')

const router = express.Router()

router.get('/', newsController.getNewsByPage)
router.get('/:id', newsController.getNewsById)
router.post('/create', upLoadImage, newsController.createNews)
router.put('/:id', newsController.updateNewsById)
router.delete('/:id', newsController.deleteNewsById)

module.exports = router