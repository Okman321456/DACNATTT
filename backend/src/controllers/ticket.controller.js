const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const { ticketService } = require('../services')
const validator = require('validator')

const bookTicket = catchAsync(async(req, res) => {
    if (!validator.isEmail(req.body.email)) {
        res.status(httpStatus.BAD_REQUEST).json('Email không hợp lệ, hãy kiểm tra lại!')
    }
    const ticket = await ticketService.bookTicket(req.params.tourId, req.body)
    if (ticket) {
        res.status(httpStatus.CREATED).send(ticket)
    } else {
        res.status(httpStatus.BAD_REQUEST).json('Dữ liệu nhập vào chưa đầy đủ hoặc chưa chính xác, hãy kiểm tra lại!')
    }
})

const viewDetailTicket = catchAsync(async(req, res) => {
    const result = await ticketService.viewDetailTicket(req.params.ticketId)
    res.send(result)
})

const showTicketPerTour = catchAsync(async(req, res) => {
    const tickets = await ticketService.showTicketPerTour(req.params.idTour)
    res.send({ tickets })
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

const getTicketRegion = catchAsync(async(req, res) => {
    const ticket = await ticketService.getTicketRegion(req.params.idRegion)
    res.send(ticket)
})

const sortTicket = catchAsync(async(req, res) => {
    const tickets = await ticketService.sortTicket()
    if (tickets) {
        res.status(200).send(tickets)
    } else {
        res.status(httpStatus.NOT_FOUND).end('Ticket Not Found!')
    }
})

module.exports = {
    bookTicket,
    viewDetailTicket,
    deleteTicket,
    viewAllTicket,
    updateTicketStatus,
    getTicketRegion,
    showTicketPerTour,
    sortTicket
}