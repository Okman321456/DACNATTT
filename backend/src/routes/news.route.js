const express = require('express');
const newsController = require('../controllers/news.controller')
const upLoadImage = require('../middlewares/fileUpload')
const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/', newsController.getNewsByPage)
router.get('/:id', newsController.getNewsById)
router.post('/create', auth('admin'), upLoadImage, newsController.createNews)
router.put('/:id', auth('admin'), upLoadImage, newsController.updateNewsById)
router.delete('/:id', auth('admin'), newsController.deleteNewsById)

module.exports = router