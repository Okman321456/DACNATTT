const {Ticket} = require('../models')

const showStatisticPerMonth = async(month) => {
    var result = []
    const tickets = await Ticket.aggregate([
        {$project: { name: 1, email:1, idTour: 1,  "month" : {$month: '$updatedAt'}, status:1}},
        {$match: { month: parseInt(month), status: 2}}
    ])
    for(let i =0; i< tickets.length; i++){
        const ticketTour = await Ticket.findById(tickets[i]._id.toString()).populate({path: 'idTour'})
        tickets[i].price = ticketTour.idTour.price   
         result.push(tickets[i])
    }

    return result
} 

module.exports = {
    showStatisticPerMonth
}