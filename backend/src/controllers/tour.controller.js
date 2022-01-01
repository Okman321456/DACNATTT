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
        res.status(httpStatus.NOT_FOUND).send("Tour not found")
    } else res.status(200).send(tours);
})

const getTourById = catchAsync(async(req, res) => {
    const tour = await tourService.getTourById(req.params.tourId)

    if (!tour) {
        res.status(httpStatus.NOT_FOUND).send("Tour not found")
    } else res.status(200).send(tour);
})

const updateTourById = catchAsync(async(req, res) => {
    const tour = await tourService.updateTourById(req.params.tourId, req.body)
    res.status(200).send(tour)
})

const deleteTourById = catchAsync(async(req, res) => {
    await tourService.deleteTourById(req.params.tourId)
    res.status(httpStatus.NO_CONTENT).send("Tour has been deleted")
})

/*Get tour region */
const getTourRegion = (regionId) => async(req, res) => {
    const perPage = 6;
    let totalTourRegion = 0
    let page = parseInt(req.query.page) || 1;
    let search = req.query.search || ''

    const tours = await tourService.getTourRegion(regionId, perPage, page, search)
    if (search == '') totalTourRegion = await tourService.countTourRegion(regionId)
    else totalTourRegion = await tourService.countTourSearchRegion(regionId, search)
    if (!tours) {
        res.status(httpStatus.NOT_FOUND).send("Tour region not found")
    } else res.status(200).json({ tours, totalTourRegion })
}

const getTourRegionById = (regionId) => async(req, res) => {
    const tour = await tourService.getTourRegionById(req.params.tourId, regionId)

    if (!tour) {
        res.status(httpStatus.NOT_FOUND).send("Tour not found")
    } else res.status(200).send(tour);
}

const sortTourRegion = (regionId, status, typeSort) => catchAsync(async(req, res) => {
    const perPage = 6;
    let page = parseInt(req.query.page) || 1;

    const tours = await tourService.sortTourRegion(regionId, status, typeSort, perPage, page)
    const totalTourRegion = await tourService.countTourRegion(regionId)
    if (!tours) {
        res.status(httpStatus.NOT_FOUND).send("Tour not found")
    } else res.status(200).json({ tours, totalTourRegion })
})

// const sortTour = catchAsync(async(req, res) => {
//     if (req.query.min >= req.query.max) req.status(httpStatus.BAD_REQUEST).send("Can't query price")
//     const tours = await tourService.sortTour(req.query.min, req.query.max)
//     if (!tours) {
//         res.status(httpStatus.NOT_FOUND).send("Tour region not found")
//     } else res.send(tours);
// })

module.exports = {
    createTour,
    getAllTour,
    getTourById,
    updateTourById,
    deleteTourById,
    getTourRegion,
    getTourRegionById,
    sortTourRegion
}