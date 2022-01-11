const express = require('express');
const auth = require('../middlewares/auth')
const ticketController = require('../controllers/ticket.controller')

const router = express.Router();

router.post('/book/:tourId', ticketController.bookTicket)
router.get('/detail/:ticketId', auth('admin', 'manage'), ticketController.viewDetailTicket)
router.delete('/delete/:ticketId', auth('admin', 'manage'), ticketController.deleteTicket)
router.put('/updateStatus/:ticketId/:ticketStatus', auth('admin', 'manage'), ticketController.updateTicketStatus)
router.get('/listTicket', auth('admin', 'manage'), ticketController.viewAllTicket)

module.exports = router;