const express = require('express');
const tourController = require('../controllers/tour.controller')
const upLoadImage = require('../middlewares/fileUpload')

const authController = require('../controllers/auth.controller')

const router = express.Router();

router.get('/', tourController.getAllTour)
router.get('/sort', tourController.sortTour)

router.get('/mien-bac', tourController.getTourRegion(1))
router.get('/mien-bac/:tourId', tourController.getTourRegionById(1))

router.get('/mien-trung', tourController.getTourRegion(2))
router.get('/mien-trung/:tourId', tourController.getTourRegionById(2))

router.get('/mien-nam', tourController.getTourRegion(3))
router.get('/mien-nam/:tourId', tourController.getTourRegionById(3))

router.post('/create', upLoadImage, tourController.createTour)
router.get('/:tourId', tourController.getTourById)
router.put('/:tourId', tourController.updateTourById)
router.delete('/:tourId', tourController.deleteTourById)

module.exports = router;