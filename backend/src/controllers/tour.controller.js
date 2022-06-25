const fs = require('fs')
const httpStatus = require('http-status');
const configFilter = require('../config/filter')
const sortConstant = require('../config/sortConstant')
const catchAsync = require('../utils/catchAsync')
const handleRatingTour = require('../utils/handleRatingTour')
const { tourService, newsService, feedbackService } = require('../services')
const { tourValidation, tourParamsValidation } = require('../validations')
const { processreq } = require("./takefeature")
const { processrq } = require("./talk")

/* create new tour */
const createTour = catchAsync(async(req, res) => {
    const image = req.file ? { imageUrl: req.file.path } : {}
    const tourBody = Object.assign(req.body, image)
    const validation = await tourValidation.validate(tourBody)
    if (validation.error) {
        const errorMessage = validation.error.details[0].message
        if (req.file) {
            fs.unlink(`${req.file.path}`, (err) => {
                if (err) {
                    console.error(err)
                    res.status(httpStatus.BAD_REQUEST).send({ message: err })
                }
            })
        }
        return res.status(httpStatus.BAD_REQUEST).send({
            message: errorMessage
        })
    }
    const tour = await tourService.createTour(tourBody)

    res.status(httpStatus.CREATED).send(tour)
})

/* get tour page home */
const outstandingTour = catchAsync(async(req, res) => {
    const tours = await tourService.getAllTour();
    const minmaxPrice = await minmaxValue()
    const news = await newsService.getNewsPageHome()
    var arrayRating = [],
        outstandingTourTemp = []
    for (let index = 0; index < tours.length; index++) {
        var rating = await tourService.caculateRatingTour(tours[index]._id.toString()) || 0
        arrayRating.push({ id: tours[index]._id.toString(), rating: rating })
    }
    arrayRating.sort(function(a, b) {
        return b.rating - a.rating;
    })
    for (let index = 0; index < 8; index++) {
        var tour = await tourService.getTourById(arrayRating[index].id)
        outstandingTourTemp.push(Object.assign(tour._doc, { rating: arrayRating[index].rating }))
    }
    const outstandingTour = outstandingTourTemp
    res.status(200)
        .json({
            outstandingTour,
            minmaxPrice,
            news
        })
})

/* get min max price in list tour */
const minmaxValue = async() => {
    const arrayMinMax = await tourService.getMinMaxPrice()
    return {
        min: arrayMinMax[0].min,
        max: arrayMinMax[0].max
    }
}

/* filter tour with query parameter (region, typePlace, minmaxPrice, discount, search data)*/
const filterTour = catchAsync(async(req, res) => {

    // var spawn = require('child_process').spawn;

    var result = processreq(req)
        // console.log(result)
        // console.log(result["Len_of_rq"],
        //         result["Len_of_argu"],
        //         result["Num_of_argu"],
        //         result["Num_of_digit_in_argu"],
        //         result["Len_of_path"],
        //         result["Num_of_let_in_argu"],
        //         result["Num_of_let_char_in_path"],
        //         result["Num_of_spea_char_in_path"])
        //console.log(req.params.id.toString());
        // console.log(req)
        // console.log("")
        // console.log(JSON.stringify(req.headers))
        // console.log("")
        // console.log(JSON.stringify(req.query))
        // console.log("")
        // console.log(req.method)
        // console.log("")
        // console.log(req.baseUrl)
        // console.log("")
        // console.log(req.httpVersion)
        // console.log("")
        // console.log(req.headers.connection)
        // console.log("")
        // console.log(req.headers.accept)
        // console.log("")
        // console.log(req.headers["accept-language"])
        // console.log("")
        // console.log(req.headers["user-agent"])
        // console.log("")
        // console.log(req.url)
        //E.g : http://localhost:3000/name?firstname=van&lastname=nghia
        // var process = spawn('python', [
        //     './src/controllers/process.py',
        //     result["Len_of_rq"],
        //     result["Len_of_argu"],
        //     result["Num_of_argu"],
        //     result["Len_of_path"],
        //     result["Num_of_digit_in_argu"],
        //     result["Num_of_let_in_argu"],
        //     result["Num_of_let_char_in_path"],
        //     result["Num_of_spea_char_in_path"]
        // ]);
    const pred = await processrq(result)
        // console.log("server ", pred)
        // process.stdout.on('data', function(data) {
        //     console.log(data.toString());
        //     // console.log("2");

    //     // res.send(data.toString());
    // });
    if (pred == 0) {
        console.log("normal")
        console.log(pred)
        const perPage = 6;
        var regionId, disValue
        const minmaxPrice = await minmaxValue()
        let page = parseInt(req.query.page) || 1;
        let search = req.query.search || ''
        let typePlace = !![req.query.type][0] ? [req.query.type] : configFilter.typePlace
        let minPrice = parseInt(req.query.min) || minmaxPrice.min
        let maxPrice = parseInt(req.query.max) || minmaxPrice.max
        let discount = req.query.dis || false
        if (discount) disValue = [0.0001, 1]
        else disValue = [0, 1]
        if (req.query.region) {
            switch (req.query.region) {
                case 'bac':
                    regionId = [1]
                    break
                case 'trung':
                    regionId = [2]
                    break
                case 'nam':
                    regionId = [3]
                    break
            }
        } else regionId = configFilter.regionId
        const toursData = await tourService.filterTour(regionId, typePlace, maxPrice, minPrice, disValue, search, perPage, page)
        const totalTourFilter = await tourService.countTourFilter(regionId, typePlace, maxPrice, minPrice, disValue, search)
        const tours = await handleRatingTour(toursData)
        if (totalTourFilter == 0) {
            res.status(httpStatus.NOT_FOUND).send("Tour not found")
        } else res.status(200)
            .json({
                tours,
                totalTourFilter,
                minmaxPrice
            });
    } else {
        console.log("anomalous")
        console.log(pred)
    }
})

/* get all information in page tour detail */
const getTourById = catchAsync(async(req, res) => {
    var spawn = require('child_process').spawn;

    // E.g : http://localhost:3000/name?firstname=van&lastname=nghia
    var process = spawn('python', [
        './src/controllers/process.py',
        req.params.tourId
    ]);
    const validation = await tourParamsValidation.validate(req.params)
    if (validation.error) {
        const errorMessage = validation.error.details[0].message
        return res.status(httpStatus.BAD_REQUEST).send({
            message: errorMessage
        })
    }
    const tourData = await tourService.getTourById(req.params.tourId)
    if (!tourData) {
        res.status(httpStatus.NOT_FOUND).send("Tour not found")
    }
    const remainingAmount = await tourService.caculateRemainingAmount(req.params.tourId)
    const rating = await tourService.caculateRatingTour(req.params.tourId) || 0
    const similarTourData = await tourService.similarTourByTypePlace(req.params.tourId)
    const listFeedback = await feedbackService.showFeedbackPerTour(req.params.tourId)
    const similarTour = await handleRatingTour(similarTourData)
    const tour = Object.assign(tourData._doc, { rating })
    if (!tour) {
        res.status(httpStatus.NOT_FOUND).send("Tour not found")
    } else res.status(200).json({
        tour,
        remainingAmount,
        similarTour,
        listFeedback
    });
    process.stdout.on('data', function(data) {
        console.log(data.toString());

        res.send(data.toString());
    });
})


/* update tour detail with params id */
const updateTourById = catchAsync(async(req, res) => {
    const validationParams = await tourParamsValidation.validate(req.params)
    if (validationParams.error) {
        const errorMessage = validationParams.error.details[0].message
        return res.status(httpStatus.BAD_REQUEST).send({
            message: errorMessage
        })
    }
    if (req.file) {
        const tourData = await tourService.getTourById(req.params.tourId)
        if (tourData.imageUrl) {
            const path = tourData.imageUrl.slice(14)
            fs.unlink(`./public/uploads/${path}`, (err) => {
                if (err) {
                    console.error(err)
                    res.status(httpStatus.BAD_REQUEST).send({ error: err })
                }
            })
        }
    }

    const image = req.file ? { imageUrl: req.file.path } : {}
    const tourBody = Object.assign(req.body, image)
    const validation = await tourValidation.validate(tourBody)
    if (validation.error) {
        const errorMessage = validation.error.details[0].message
        if (req.file) {
            fs.unlink(`${req.file.path}`, (err) => {
                if (err) {
                    console.error(err)
                    res.status(httpStatus.BAD_REQUEST).send({ message: err })
                }
            })
        }
        return res.status(httpStatus.BAD_REQUEST).send({
            message: errorMessage
        })
    }

    const tour = await tourService.updateTourById(
        req.params.tourId,
        tourBody
    )
    res.status(200).send(tour)
})


/* delete tour detail by params id */
const deleteTourById = catchAsync(async(req, res) => {
    const validationParams = await tourParamsValidation.validate(req.params)
    if (validationParams.error) {
        const errorMessage = validationParams.error.details[0].message
        return res.status(httpStatus.BAD_REQUEST).send({
            message: errorMessage
        })
    }
    const tourData = await tourService.getTourById(req.params.tourId)
    if (!tourData) {
        res.status(httpStatus.NOT_FOUND).send("Tour not found")
    }
    if (tourData.imageUrl) {
        fs.unlink(`${tourData.imageUrl}`, (err) => {
            if (err) {
                console.error(err)
                res.status(httpStatus.BAD_REQUEST).send({ message: err })
            }
        })
    }
    await tourService.deleteTourById(req.params.tourId)
    res.status(httpStatus.NO_CONTENT).send()
})

/*Get tour region (sort by name and price)*/
const getTourRegion = (regionId) => async(req, res) => {
    const perPage = 6
    var typeSort
    let totalTourRegion = 0
    let page = parseInt(req.query.page) || 1
    let search = req.query.search || ''
    let sortBy = req.query.sortBy || ''
    if (sortConstant.includes(sortBy)) {
        switch (sortBy) {
            case 'price-asc':
                typeSort = { priceDis: 1 }
                break
            case 'price-dec':
                typeSort = { priceDis: -1 }
                break
            case 'name-asc':
                typeSort = { name: 1 }
                break
            case 'name-dec':
                typeSort = { name: -1 }
                break
            default:
                typeSort = { name: 1 }
        }
    } else res.status(httpStatus.NOT_FOUND).send('Invalid query params')
    const toursData = await tourService.getTourRegion(regionId, perPage, page, search, typeSort)
    const tours = await handleRatingTour(toursData)
    totalTourRegion = await tourService.countTourRegion(regionId, search)
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