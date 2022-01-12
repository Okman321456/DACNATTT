const express = require('express');
const auth = require('../middlewares/auth')
const ticketController = require('../controllers/ticket.controller')

const router = express.Router();

router.post('/book/:tourId', ticketController.bookTicket)
router.get('/detail/:ticketId', auth('admin', 'manage'), ticketController.viewDetailTicket)
router.delete('/delete/:ticketId', auth('manage'), ticketController.deleteTicket)
router.put('/updateStatus/:ticketId/:ticketStatus', auth('manage'), ticketController.updateTicketStatus)
router.get('/listTicket', auth('admin', 'manage'), ticketController.viewAllTicket)
router.get('/region/:idRegion', auth('admin', 'manage'), ticketController.getTicketRegion)


module.exports = router;