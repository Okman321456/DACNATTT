const express = require('express');
const auth = require('../middlewares/auth')
const statisticController = require('../controllers/statistic.controller')

const router = express.Router();

router.get('/:month', statisticController.showStatisticPerMonth)
// router.get('/detail/:ticketId', ticketController.viewDetailTicket)
// router.delete('/delete/:ticketId', ticketController.deleteTicket)
// router.put('/updateStatus/:ticketId/:ticketStatus', ticketController.updateTicketStatus)
// router.get('/listTicket', ticketController.viewAllTicket)
// router.get('/region/:idRegion', ticketController.getTicketRegion)


module.exports = router;