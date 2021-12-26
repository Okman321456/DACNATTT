const express = require('express');
const tourController = require('../controllers/tour.controller')
const upLoadImage = require('../middlewares/fileUpload')

const router = express.Router();

router.get('/', tourController.getAllTour)
router.post('/create', upLoadImage, tourController.createTour)
router.get('/:tourId', tourController.getTourById)
router.put('/:tourId', tourController.updateTourById)
router.delete('/:tourId', tourController.deleteTourById)

module.exports = router;