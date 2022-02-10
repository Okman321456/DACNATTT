const { Ticket } = require('../models')

const showStatisticPerMonth = async(month) => {
    let data = []
    let totalPrice = 0
    let totalPeople = 0
    const tickets = await Ticket.aggregate([{
            $project: {
                name: 1,
                email: 1,
                idTour: 1,
                numberPeople: 1,
                updatedAt: 1,
                "month": { $month: '$updatedAt' },
                status: 1,
            },

        },
        { $match: { month: parseInt(month), status: 2 } }
    ])
    for (let i = 0; i < tickets.length; i++) {
        const ticketTour = await Ticket.findById(tickets[i]._id.toString()).populate({ path: 'idTour' })
        tickets[i].totalPrice = parseInt(ticketTour.idTour.price * ticketTour.numberPeople * (1 - ticketTour.idTour.discount))
        tickets[i].tourName = ticketTour.idTour.name
        totalPrice += tickets[i].totalPrice
        totalPeople += tickets[i].numberPeople
        data.push(tickets[i])
    }
    return { data, totalPrice, totalPeople }
}

const showStatisticPerTour = async(month) => {
    return await Ticket.aggregate(
        [
            { $match: { status: 2 } },
            {
                $project: {
                    name: 1,
                    email: 1,
                    idTour: 1,
                    numberPeople: 1,
                    status: 1,
                },

            },
            // {
            //     $group: {
            //         _id: "$idTour",
            //         listNumberPeople: { $addToSet: "$numberPeople" },
            //     },
            // },
            // {
            //     "$addFields": {
            //         "totalPeople": {
            //             "$sum": "$listNumberPeople"
            //         }
            //     }
            // },
            {
                $lookup: {
                    from: "tours",
                    localField: "idTour",
                    foreignField: "_id",
                    as: "tour"
                }
            },
            { $unwind: '$tour' },
            {
                "$addFields": {
                    "totalSales": {
                        "$multiply": [
                            "$numberPeople",
                            "$tour.price",
                        ]
                    },
                    "totalSalesTemp": {
                        "$multiply": [
                            "$numberPeople",
                            "$tour.price",
                            "$tour.discount"
                        ]
                    }
                }
            },
            {
                "$addFields": {
                    "totalSalesDis": {
                        "$subtract": ["$totalSales", "$totalSalesTemp"]
                    },
                    "totalPeople": "$numberPeople",
                    "tourName": "$tour.name",
                    "region": "$tour.region",
                    "typePlace": "$tour.typePlace"
                }
            },
            {
                $project: {
                    _id: 1,
                    idTour: 1,
                    totalPeople: 1,
                    tourName: 1,
                    region: 1,
                    typePlace: 1,
                    totalSalesDis: 1,
                },
            },
            {
                "$sort": { totalSalesDis: -1 }
            },
        ]
    )
}


module.exports = {
    showStatisticPerMonth,
    showStatisticPerTour
}