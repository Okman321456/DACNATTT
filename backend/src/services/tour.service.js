const { Tour } = require('../models');
const catchAsync = require('../utils/catchAsync');

const createTour = async(tourBody) => {
    const tour = await Tour.create(tourBody)
    return tour
}

const getAllTour = async(perPage, page) => {
    return await Tour
        .find()
        .skip((perPage * page) - perPage)
        .limit(perPage)
}

const filterTour = async(regionId, typePlace, max, min, perPage, page) => {
    return await Tour
        .find({
            region: regionId,
            typePlace: typePlace,
            price: { $gte: min, $lte: max }
        })
        .sort({ price: 1 })
        .skip((perPage * page) - perPage)
        .limit(perPage)
}

const countTourFilter = async(regionId, typePlace, max, min) => {
    return await Tour
        .find({
            region: regionId,
            typePlace: typePlace,
            price: { $gte: min, $lte: max }
        }).count()
}

const getMinMaxPrice = async() => {
    return await Tour.aggregate([{
        "$group": {
            "_id": null,
            "max": { "$max": "$price" },
            "min": { "$min": "$price" }
        }
    }])
}

const getTourById = async(id) => {
    return await Tour.findById(id)
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
const countTourRegion = async(regionId) => {
    return await Tour.find({ region: regionId }).count()
}

const countTourSearchRegion = async(regionId, searchString) => {
    return await Tour
        .find({
            region: regionId,
            name: { $regex: new RegExp(searchString, "i") }
        })
        .count()
}

const getTourRegion = async(regionId, perPage, page, searchString) => {
    return await Tour
        .find({
            region: regionId,
            name: { $regex: new RegExp(searchString, "i") }
        })
        .skip((perPage * page) - perPage)
        .limit(perPage)
}

//name: { $regex: searchString }
// description: { $regex: new RegExp(searchString, "i") }

const searchFull = async(searchString) => {
    return await Tour.find({
        name: /đà/
    })
}

const getTourRegionById = async(id, regionId) => {
    return await Tour.find({ region: regionId, _id: id })
}

/* sort tour region*/
const sortTourRegion = async(regionId, status, typeSort, perPage, page) => {
    if (typeSort == 'price')
        return await Tour
            .find({ region: regionId })
            .sort({ price: status })
            .skip((perPage * page) - perPage)
            .limit(perPage)
    else return await Tour
        .find({ region: regionId })
        .sort({ name: status })
        .skip((perPage * page) - perPage)
        .limit(perPage)
}

module.exports = {
    createTour,
    getAllTour,
    getTourById,
    updateTourById,
    deleteTourById,
    getTourRegion,
    countTourRegion,
    countTourSearchRegion,
    getTourRegionById,
    sortTourRegion,
    filterTour,
    countTourFilter,
    getMinMaxPrice,
    searchFull
}