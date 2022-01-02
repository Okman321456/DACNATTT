const {Ticket} = require('../models')
const {User} = require('../models')
const {Tour} = require('../models')

const bookTicket = async(id, ticketBody) => {
    // const user = await User.findOne({email: ticketBody.email})
    // if(user){
        // const userId = user._id
        const ticket = await Ticket.create({
            idTour: id,
            nameUser = ticketBody.name,
            emailUser = ticketBody.email,
            phone = ticketBody.phone,
            // idUser: userId,
            status: 0,
            numberPeople: ticketBody.numberPeople
        })
        return ticket
    // }
    // else {
    //     console.log('Email Không Chính Xác')
    //     return null
    // }

}

const viewDetailTicket = async(id) => {
    const ticketDetail = {}
    const ticketUser = await Ticket.findById(id).populate({path: 'idUser'})
    const ticketTour = await Ticket.findById(id).populate({path: 'idTour'})
    ticketDetail.userName = ticketUser.idUser.name
    ticketDetail.userEmail = ticketUser.idUser.email
    ticketDetail.userPhone = ticketUser.idUser.phone
    ticketDetail.tourName = ticketTour.idTour.name
    ticketDetail.timeStart = ticketTour.idTour.timeStart
    ticketDetail.timeEnd = ticketTour.idTour.timeEnd
    ticketDetail.price = ticketTour.idTour.price
    ticketDetail.hotelName = ticketTour.idTour.hotel_name
    ticketDetail.numberPeople = ticketUser.numberPeople
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