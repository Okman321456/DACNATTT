const express = require('express');
const tourController = require('../controllers/tour.controller')

const router = express.Router()
router.get('/', tourController.filterTour)

module.exports = router