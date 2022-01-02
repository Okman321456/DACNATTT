const express = require('express');
const feedbackController = require('../controllers/feedback.controller')

const router = express.Router();

router.post('/create/:idTour', feedbackController.createFeedback)
// router.get('/detail/:ticketId', ticketController.viewDetailTicket)
// router.post('/delete/:ticketId', ticketController.deleteTicket)
// router.put('/updateStatus/:ticketId/:ticketStatus', ticketController.updateTicketStatus)
router.get('/listFeedbacks', feedbackController.showListFeedback)
router.get('/:idTour', feedbackController.showFeedbackPerTour)
// router.put('/:tourId', userController.updateUserById)
// router.delete('/:tourId', userController.deleteUserById)

module.exports = router;