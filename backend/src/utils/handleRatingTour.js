const { tourService } = require("../services");

const handleRatingTour = async(tours) => {
    var toursResult = []
    for (let tour of tours) {
        var rating = await tourService.caculateRatingTour(tour._id) || 0
        var tourDetail = Object.assign(tour._doc, { rating: rating })
        toursResult.push(tourDetail)
    }
    return toursResult
}

module.exports = handleRatingTour