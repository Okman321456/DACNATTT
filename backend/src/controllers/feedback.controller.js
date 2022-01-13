const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const { feedbackService } = require('../services');
const validator = require('validator')

// user
const createFeedback = catchAsync(async(req, res) => {
    if(!validator.isEmail(req.body.email)){
        res.json('Email không hợp lệ, hãy kiểm tra lại!')
        return
    }
    const feedback = await feedbackService.createFeedback(req.params.idTour, req.body)
    if(feedback){
        res.send(feedback)
    }
    else {
        res.send('Dữ liệu nhập vào chưa đầy đủ hoặc chưa chính xác, hãy kiểm tra lại!')
    }
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