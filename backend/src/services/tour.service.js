const { Tour } = require('../models');
const { Ticket } = require('../models');
const { Feedback } = require('../models')

const createTour = async(tourBody) => {
    const tour = await Tour.create(tourBody)
    return tour
}

const getAllTour = async() => {
    return await Tour.find()
}

// const filterTour = async(regionId, typePlace, max, min, disValue, search, perPage, page) => {
//     return await Tour
//         .find({
//             region: regionId,
//             typePlace: typePlace,
//             price: { $gte: min, $lte: max },
//             name: { $regex: new RegExp(search, "i") },
//             discount: { $gte: disValue[0], $lte: disValue[1] }
//         })
//         .sort({ price: 1 })
//         .skip((perPage * page) - perPage)
//         .limit(perPage)
// }

const filterTour = async(regionId, typePlace, max, min, disValue, search, perPage, page) => {
    return await Tour.aggregate([{
            "$match": {
                region: {
                    "$in": regionId
                },
                typePlace: {
                    "$in": typePlace
                },
                price: { $gte: min, $lte: max },
                name: { $regex: new RegExp(search, "i") },
                discount: { $gte: disValue[0], $lte: disValue[1] }
            }
        }])
        .skip((perPage * page) - perPage)
        .limit(perPage)
}

const countTourFilter = async(regionId, typePlace, max, min, disValue, search) => {
    const tours = await Tour
        .aggregate([{
                "$addFields": {
                    "priceDis": {
                        "$subtract": [
                            "$price",
                            { "$multiply": ["$price", "$discount"] }
                        ]
                    }
                }
            },
            {
                "$match": {
                    region: {
                        "$in": regionId
                    },
                    typePlace: {
                        "$in": typePlace
                    },
                    "priceDis": { $gte: min, $lte: max },
                    name: { $regex: new RegExp(search, "i") },
                    discount: { $gte: disValue[0], $lte: disValue[1] }
                }
            }
        ])
    return (await tours).length
}

const getMinMaxPrice = async() => {
    return await Tour.aggregate([{
        "$group": {
            "_id": null,
            "max": {
                "$max": {
                    "$subtract": [
                        "$price",
                        { "$multiply": ["$price", "$discount"] }
                    ]
                }
            },
            "min": {
                "$min": {
                    "$subtract": [
                        "$price",
                        { "$multiply": ["$price", "$discount"] }
                    ]
                }
            }
        }
    }])
}

const getTourById = async(id) => {
    return await Tour.findById(id)
}

const caculateRemainingAmount = async(id) => {
    const tour = await Tour.findById(id)
    let remainingAmount = tour.amount
    const ticket = await Ticket.find().populate({ path: 'idTour' })
    ticket.forEach(element => {
        if (element.idTour._id == id) {
            remainingAmount -= element.numberPeople
        }
    });
    return remainingAmount
}
const updateTourById = async(id, data) => {
    const tour = await getTourById(id);
    Object.assign(tour, data);
    await tour.save();
    return tour;
};

const deleteTourById = async(id) => {
    const tour = await getTourById(id)
    await tour.remove()
    return tour
}

/* Get tour region*/

const countTourRegion = async(regionId, searchString) => {
    return await Tour
        .find({
            region: regionId,
            name: { $regex: new RegExp(searchString, "i") }
        })
        .count()
}

// const getTourRegion = async(regionId, perPage, page, searchString) => {
//     return await Tour
//         .find({
//             region: regionId,
//             name: { $regex: new RegExp(searchString, "i") }
//         })
//         .skip((perPage * page) - perPage)
//         .limit(perPage)
// }

const getTourRegion = async(regionId, perPage, page, searchString, typeSort) => {
    return await Tour.aggregate([{
                "$match": {
                    region: regionId,
                    name: {
                        $regex: new RegExp(searchString, "i")
                    }
                }
            },
            {
                "$addFields": {
                    "priceDis": {
                        "$subtract": [
                            "$price",
                            { "$multiply": ["$price", "$discount"] }
                        ]
                    }
                }
            },
            { "$sort": typeSort }
        ])
        .skip((perPage * page) - perPage)
        .limit(perPage)
}

const similarTourByTypePlace = async(id) => {
    const similarTour = []
    const tourData = await Tour.find({ _id: id })
    const tours = await Tour
        .aggregate([{
            "$match": {
                typePlace: tourData[0].typePlace
            }
        }])
    tours.forEach(tour => {
        if (tour._id != id) similarTour.push(tour)
    })
    return await similarTour
}

/* get average rating tour */
const caculateRatingTour = async(idTour) => {
    var averageRating = 0
    const data = await Feedback.find({ idTour: idTour })
        .populate({ path: 'idTour' })
    data.forEach(tour => {
        averageRating += tour.rating
    });
    return await Math.round(((averageRating / data.length) * 10)) / 10
}


module.exports = {
    createTour,
    getAllTour,
    getTourById,
    updateTourById,
    deleteTourById,
    getTourRegion,
    countTourRegion,
    caculateRemainingAmount,
    countTourFilter,
    filterTour,
    getMinMaxPrice,
    similarTourByTypePlace,
    caculateRatingTour,
}