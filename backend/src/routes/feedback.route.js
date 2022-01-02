const express = require('express');
const feedbackController = require('../controllers/feedback.controller')

const router = express.Router();

router.post('/create/:idTour', feedbackController.createFeedback)
router.get('/listFeedbacks', feedbackController.showListFeedback)
router.get('/:idTour', feedbackController.showFeedbackPerTour)
router.delete('/delete/:idFeedback', feedbackController.deleteFeedback)
module.exports = router;