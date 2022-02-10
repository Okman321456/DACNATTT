const catchAsync = require('../utils/catchAsync')
const httpStatus = require('http-status')
const { tourService, newsService, feedbackService, statisticService } = require('../services')

const regionObj = { 'bac': 1, 'trung': 2, 'nam': 3 }
const showStatisticPerMonth = catchAsync(async(req, res) => {
    const result = await statisticService.showStatisticPerMonth(req.params.month)
    res.status(httpStatus['OK']).send(result)
})

const showStatisticPerTour = catchAsync(async(req, res) => {
    const result = await statisticService.showStatisticPerTour()
    let totalTour = 0
    const tourIdGr = result.reduce((tourIdGr, element) => {
        if (!tourIdGr[element.idTour]) {
            tourIdGr[element.idTour] = 1
            totalTour += 1;
        }

        return tourIdGr;
    }, [])

    console.log(totalTour);
    const regionGr = result.reduce((regionGr, element) => {
        if (!regionGr[element.region]) regionGr[element.region] = 0;

        regionGr[element.region] += element.totalSalesDis

        return regionGr;
    }, {})

    if (req.query.region) {
        const rs = result.filter(tour => {
            return tour.region == regionObj[req.query.region]
        })
        res.status(200).send({
            result: rs,
            region: regionGr,
            totalTour: totalTour
        })
    } else res.status(200).send({
        result,
        region: regionGr,
        totalTour: totalTour
    })
})

module.exports = {
    showStatisticPerMonth,
    showStatisticPerTour,
}