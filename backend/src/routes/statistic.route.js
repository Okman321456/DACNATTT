const express = require('express');
const auth = require('../middlewares/auth')
const statisticController = require('../controllers/statistic.controller')

const router = express.Router()

router.get('/tours', auth('admin'), statisticController.showStatisticPerTour)
router.get('/:month', auth('admin'), statisticController.showStatisticPerMonth)

module.exports = router