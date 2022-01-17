const express = require('express');
const auth = require('../middlewares/auth')
const ticketController = require('../controllers/ticket.controller')

const router = express.Router();

router.post('/book/:tourId', ticketController.bookTicket)
router.get('/tour/:idTour', ticketController.showTicketPerTour)
router.get('/detail/:ticketId', auth('admin', 'manage'), ticketController.viewDetailTicket)
router.delete('/delete/:ticketId', auth('manage'), ticketController.deleteTicket)
router.put('/updateStatus/:ticketId/:ticketStatus', auth('manage'), ticketController.updateTicketStatus)
router.get('/listTicket', auth('admin', 'manage'), ticketController.viewAllTicket)
router.get('/region/:idRegion', ticketController.getTicketRegion)
router.get('/sort', ticketController.sortTicket)
router.get("/phone/:phone", ticketController.showTicketPerPhone);
router.get("/date/:date", ticketController.showTicketPerDate);

module.exports = router;