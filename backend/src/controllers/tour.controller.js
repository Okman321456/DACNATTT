const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const configFilter = require('../config/filter')
const sortConstant = require('../config/sortConstant')
const { tourService, newsService, feedbackService } = require('../services')

const createTour = catchAsync(async(req, res) => {
    const tour = await tourService.createTour(
        Object.assign(req.body, { imageUrl: req.file.path })
    )
    res.status(httpStatus.CREATED).send(tour)
})

const outstandingTour = catchAsync(async(req, res) => {
    const tours = await tourService.getAllTour();
    const minmaxPrice = await minmaxValue()
    const news = await newsService.getNewsPageHome()
    var arrayRating = [],
        outstandingTour = []
    for (let index = 0; index < tours.length; index++) {
        var rating = await tourService.caculateRatingTour(tours[index]._id.toString()) || 0
        arrayRating.push({ id: tours[index]._id.toString(), rating: rating })
    }
    arrayRating.sort(function(a, b) {
        return b.rating - a.rating;
    })
    for (let index = 0; index < 8; index++) {
        outstandingTour.push(await tourService.getTourById(arrayRating[index].id))
    }
    res.status(200)
        .json({
            outstandingTour,
            minmaxPrice,
            news
        })
})

const minmaxValue = async() => {
    const arrayMinMax = await tourService.getMinMaxPrice()
    return {
        min: arrayMinMax[0].min,
        max: arrayMinMax[0].max
    }
}

const filterTour = catchAsync(async(req, res) => {
    const perPage = 6;
    var regionId, disValue
    const minmaxPrice = await minmaxValue()
    let page = parseInt(req.query.page) || 1;
    let search = req.query.search || ''
    let typePlace = req.query.type || configFilter.typePlace
    let minPrice = parseInt(req.query.min) || minmaxPrice.min
    let maxPrice = parseInt(req.query.max) || minmaxPrice.max
    let discount = req.query.dis || false
    if (discount) disValue = [0.0001, 1]
    else disValue = [0, 0]
    if (req.query.region) {
        switch (req.query.region) {
            case 'bac':
                regionId = 1
                break
            case 'trung':
                regionId = 2
                break
            case 'nam':
                regionId = 3
                break
        }
    } else regionId = configFilter.regionId

    const tours = await tourService.filterTour(regionId, typePlace, maxPrice, minPrice, disValue, search, perPage, page)
    const totalTourFilter = await tourService.countTourFilter(regionId, typePlace, maxPrice, minPrice, disValue, search)
    if (totalTourFilter == 0) {
        res.status(httpStatus.NOT_FOUND).send("Tour not found")
    } else res.status(200)
        .json({
            tours,
            totalTourFilter,
            minmaxPrice
        });
})

const getTourById = catchAsync(async(req, res) => {
    const tour = await tourService.getTourById(req.params.tourId)
    const remainingAmount = await tourService.caculateRemainingAmount(req.params.tourId)
    const rating = await tourService.caculateRatingTour(req.params.tourId) || 0
    const similarTour = await tourService.similarTourByTypePlace(req.params.tourId)
    const listFeedback = await feedbackService.showFeedbackPerTour(req.params.tourId)
    if (!tour) {
        res.status(httpStatus.NOT_FOUND).send("Product not found")
    } else res.status(200).json({
        tour,
        rating,
        remainingAmount,
        similarTour,
        listFeedback
    });

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
    const perPage = 6
    var ObjSort = {}
    let totalTourRegion = 0
    let page = parseInt(req.query.page) || 1
    let search = req.query.search || ''
    let sortBy = req.query.sortBy || ''
    if (sortConstant.includes(sortBy)) {
        switch (sortBy) {
            case 'price-asc':
                ObjSort = { price: 1 }
                break
            case 'price-dec':
                ObjSort = { price: -1 }
                break
            case 'name-asc':
                ObjSort = { name: 1 }
                break
            case 'name-dec':
                ObjSort = { name: -1 }
                break
        }
    } else res.status(httpStatus.NOT_FOUND).send('Invalid query params')

    const tours = await tourService.getTourRegion(regionId, perPage, page, search, ObjSort)
    if (search == '') totalTourRegion = await tourService.countTourRegion(regionId)
    else totalTourRegion = await tourService.countTourSearchRegion(regionId, search)
    if (totalTourRegion == 0) {
        res.status(httpStatus.NOT_FOUND).send("Tour region not found")
    } else res.status(200).json({ tours, totalTourRegion })
}

module.exports = {
    createTour,
    filterTour,
    getTourById,
    updateTourById,
    deleteTourById,
    getTourRegion,
    outstandingTour
}