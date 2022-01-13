const catchAsync = require('../utils/catchAsync')
const httpStatus = require('http-status')
const { tourService, newsService, feedbackService, statisticService } = require('../services')

const showStatisticPerMonth = catchAsync(async(req, res) => {
    const result = await statisticService.showStatisticPerMonth(req.params.month)
    res.status(httpStatus['OK']).send(result)
})

module.exports = {
    showStatisticPerMonth
}