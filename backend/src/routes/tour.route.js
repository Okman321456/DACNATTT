const express = require('express');
const tourController = require('../controllers/tour.controller')
const upLoadImage = require('../middlewares/fileUpload')
const auth = require('../middlewares/auth')

const router = express.Router();

router.get('/', tourController.outstandingTour)

router.get('/mien-bac', tourController.getTourRegion(1))

router.get('/mien-trung', tourController.getTourRegion(2))

router.get('/mien-nam', tourController.getTourRegion(3))

router.get('/tour/:tourId', tourController.getTourById)

router.post('/create', auth('admin', 'manage'), upLoadImage, tourController.createTour)

router.get('/:tourId', tourController.getTourById)

router.put('/:tourId', auth('admin', 'manage'), upLoadImage, tourController.updateTourById)

router.delete('/:tourId', auth('admin', 'manage'), tourController.deleteTourById)

module.exports = router;