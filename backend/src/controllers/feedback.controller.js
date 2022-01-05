const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const { feedbackService } = require('../services');

// user
const createFeedback = catchAsync(async(req, res) => {
    const feedback = await feedbackService.createFeedback(req.params.idTour, req.body)
    res.send(feedback)
})
// admin
const showListFeedback = catchAsync(async(req, res) => {
    const listFeedback = await feedbackService.showListFeedback()
    res.send(listFeedback)
})
// tra ve danh sach feedback moi tour
const showFeedbackPerTour = catchAsync(async(req, res) => {
    const feedbacks = await feedbackService.showFeedbackPerTour(req.params.idTour)
    res.send({feedbacks})
})
// admin
const deleteFeedback = catchAsync(async(req, res) => {
    const deletedDocument = await feedbackService.deleteFeedback(req.params.idFeedback)
    res.send(`Đã xóa ${deletedDocument} Feedback!`)
})
module.exports = {
    createFeedback,
    showListFeedback,
    showFeedbackPerTour,
    deleteFeedback
}