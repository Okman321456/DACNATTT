const { Tour } = require('../models');

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

module.exports = {
    createTour,
    getAllTour,
    getTourById,
    updateTourById,
    deleteTourById
}