const { Ticket } = require('../models')
const { ticketValidation } = require('../validations')

const bookTicket = async(id, ticketBody) => {
    try {
        const validation = ticketValidation.validate(ticketBody)
        if (!validation.error) {
            const ticket = await Ticket.create({
                idTour: id,
                name: validation.value.name,
                email: validation.value.email,
                phone: validation.value.phone,
                status: 0,
                numberPeople: validation.value.numberPeople
            })
            return ticket
        } else return null

    } catch (err) {
        console.log(err)
        return null
    }

}

const viewDetailTicket = async(id) => {
    const ticketDetail = {}
    const ticket = await Ticket.findById(id)
    const ticketTour = await Ticket.findById(id).populate({ path: 'idTour' })
    ticketDetail.userName = ticket.name
    ticketDetail.userEmail = ticket.email
    ticketDetail.userPhone = ticket.phone
    ticketDetail.tourName = ticketTour.idTour.name
    ticketDetail.timeStart = ticketTour.idTour.timeStart
    ticketDetail.timeEnd = ticketTour.idTour.timeEnd
    ticketDetail.price = ticketTour.idTour.price
    ticketDetail.hotelName = ticketTour.idTour.hotelName
    ticketDetail.numberPeople = ticket.numberPeople
    ticketDetail.status = ticket.status
    return ticketDetail
}

const deleteTicket = async(id) => {
    const res = await Ticket.deleteOne({ _id: id })
    return res.deletedCount
}

const viewAllTicket = async() => {
    let allTickets = []
    const ticket = await Ticket.find().populate({ path: 'idTour' })
    ticket.forEach(element => {
        allTickets.push({
            id: element._id,
            email: element.email,
            name: element.name,
            phone: element.phone,
            tourName: element.idTour.name,
            numberPeople: element.numberPeople,
            priceTotal: element.idTour.price * element.numberPeople,
            status: element.status,
            createdAt: element.createdAt,
        })
    });
    return allTickets
}

const updateTicketStatus = async(id, status) => {
    const res = await Ticket.updateOne({ _id: id }, { status: status })
    return res.modifiedCount
}

const getTicketRegion = async(idRegion) => {
    const ticket = await Ticket.find().populate({ path: 'idTour' })
    const result = []
    ticket.forEach(element => {
        if (element.idTour.region == idRegion) {
            let temp = {}
            temp.tourName = element.idTour.name
            temp.email = element.email
            temp.name = element.name
            temp.phone = element.phone
            temp.numberPeople = element.numberPeople,
                temp.priceTotal = element.idTour.price * element.numberPeople,
                temp.status = element.status
            result.push(temp)
        }
    })
    return result
}

const showTicketPerTour = async(idTour) => {
    let ticketPerTour = []
    const ticket = await Ticket.find().populate({ path: 'idTour' })
    ticket.forEach(element => {
        if (element.idTour._id == idTour) {
            ticketPerTour.push({
                email: element.email,
                name: element.name,
                phone: element.phone,
                tourName: element.idTour.name,
                priceTotal: element.idTour.price * element.numberPeople,
                numberPeople: element.numberPeople,
                status: element.status,
                createdAt: element.createdAt,
            })
        }
    });
    return ticketPerTour
}

const sortTicket = async() => {
    return await Ticket.find().sort({ createdAt: -1 })
}

const showTicketPerPhone = async(phone) => {
    return await Ticket.findOne({ phone: phone });
}

const showTicketPerDate = async(date) => {
    const result = []
    const tickets = await Ticket.find();
    tickets.forEach(element => {
        if (JSON.stringify(element.createdAt).substring(1, 11) == date) {
            result.push(element)
        }
    })
    return result
}

module.exports = {
    bookTicket,
    viewDetailTicket,
    deleteTicket,
    viewAllTicket,
    updateTicketStatus,
    getTicketRegion,
    showTicketPerTour,
    sortTicket,
    showTicketPerPhone,
    showTicketPerDate
}