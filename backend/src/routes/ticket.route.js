const express = require('express');
const ticketController = require('../controllers/ticket.controller')

const router = express.Router();

router.post('/book/:tourId', ticketController.bookTicket)
router.get('/detail/:ticketId', ticketController.viewDetailTicket)
router.post('/delete/:ticketId', ticketController.deleteTicket)
router.put('/updateStatus/:ticketId/:ticketStatus', ticketController.updateTicketStatus)
router.get('/listTicket', ticketController.viewAllTicket)
// router.get('/:tourId', userController.getUserById)
// router.put('/:tourId', userController.updateUserById)
// router.delete('/:tourId', userController.deleteUserById)

module.exports = router;