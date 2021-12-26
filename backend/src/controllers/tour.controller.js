const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const { tourService } = require('../services')

const createTour = catchAsync(async(req, res) => {
    const tour = await tourService.createTour(
        Object.assign(req.body, { imageUrl: req.file.path })
    )
    res.status(httpStatus.CREATED).send(tour)
})

const getAllTour = catchAsync(async(req, res) => {
    const perPage = 6;
    let page = parseInt(req.query.page) || 1;

    const tours = await tourService.getAllTour(perPage, page);
    if (!tours) {
        res.status(httpStatus.NOT_FOUND).send("Product not found")
    } else res.send(tours);
})

const getTourById = catchAsync(async(req, res) => {
    const tour = await tourService.getTourById(req.params.tourId)

    if (!tour) {
        res.status(httpStatus.NOT_FOUND).send("Product not found")
    } else res.send(tour);
})

const updateTourById = catchAsync(async(req, res) => {
    const tour = await tourService.updateTourById(req.params.tourId, req.body)
    res.status(200).send(tour)
})

const deleteTourById = catchAsync(async(req, res) => {
    await tourService.deleteTourById(req.params.tourId)
    res.status(httpStatus.NO_CONTENT).send("Tour has been deleted")
})

module.exports = {
    createTour,
    getAllTour,
    getTourById,
    updateTourById,
    deleteTourById
}