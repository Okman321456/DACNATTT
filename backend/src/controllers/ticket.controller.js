const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const { ticketService } = require('../services')

const bookTicket = catchAsync(async(req, res) => {
    const ticket = await ticketService.bookTicket(req.params.tourId, req.body)
    if(ticket){
        res.status(httpStatus.CREATED).send(ticket)
    }
    else {
        res.json('Email không chính xác!')
    } 
})

const viewDetailTicket = catchAsync(async(req, res) => {
    const result = await ticketService.viewDetailTicket(req.params.ticketId)
    res.send(result)
})

const deleteTicket = catchAsync(async(req, res) => {
    const numDocumentDeleted = await ticketService.deleteTicket(req.params.ticketId)
    res.send(`Đã xóa ${numDocumentDeleted} Ticket!`)
})

const viewAllTicket = catchAsync(async(req, res) => {
    const listTicKet = await ticketService.viewAllTicket()
    res.send(listTicKet)
})

const updateTicketStatus = catchAsync(async(req, res) => {
    const numDocumentUpdated = await ticketService.updateTicketStatus(req.params.ticketId, req.params.ticketStatus)
    res.send(`Đã cập nhật trạng thái ${numDocumentUpdated} Ticket`)
})

module.exports = {
    bookTicket,
    viewDetailTicket,
    deleteTicket, 
    viewAllTicket,
    updateTicketStatus
}