const {Ticket} = require('../models')
const {User} = require('../models')
const {Tour} = require('../models')

const bookTicket = async(id, ticketBody) => {
        const ticket = await Ticket.create({
            idTour: id,
            name: ticketBody.name,
            email: ticketBody.email,
            phone: ticketBody.phone,
            status: 0,
            numberPeople: ticketBody.numberPeople
        })
        return ticket

}

const viewDetailTicket = async(id) => {
    const ticketDetail = {}
    const ticket = await Ticket.findById(id)
    const ticketTour = await Ticket.findById(id).populate({path: 'idTour'})
    ticketDetail.userName = ticket.name
    ticketDetail.userEmail = ticket.email
    ticketDetail.userPhone = ticket.phone
    ticketDetail.tourName = ticketTour.idTour.name
    ticketDetail.timeStart = ticketTour.idTour.timeStart
    ticketDetail.timeEnd = ticketTour.idTour.timeEnd
    ticketDetail.price = ticketTour.idTour.price
    ticketDetail.hotelName = ticketTour.idTour.hotelName
    ticketDetail.numberPeople = ticket.numberPeople
    ticketDetail.status = ticketUser.status
    return ticketDetail
}

const deleteTicket = async(id) => {
    const res = await Ticket.deleteOne({ _id: id})
    return res.deletedCount
}

const viewAllTicket = async() => {
    const result = await Ticket.find()
    return result
}

const updateTicketStatus = async(id, status) => {
    const res = await Ticket.updateOne({ _id: id}, { status: status })
    return res.modifiedCount
}

module.exports = {
    bookTicket,
    viewDetailTicket,
    deleteTicket,
    viewAllTicket,
    updateTicketStatus
}