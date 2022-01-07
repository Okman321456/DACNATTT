const express = require('express');
const ticketController = require('../controllers/ticket.controller')

const router = express.Router();

router.post('/book/:tourId', ticketController.bookTicket)
router.get('/detail/:ticketId', ticketController.viewDetailTicket)
router.delete('/delete/:ticketId', ticketController.deleteTicket)
router.put('/updateStatus/:ticketId/:ticketStatus', ticketController.updateTicketStatus)
router.get('/listTicket', ticketController.viewAllTicket)
router.get('/region/:idRegion', ticketController.getTicketRegion)

module.exports = router;