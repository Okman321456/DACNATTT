const {Feedback} = require('../models')
const {User} = require('../models')
const {Tour} = require('../models')

const createFeedback = async(idTour, feedbackBody) => {
    const feedback = await Feedback.create({
        idTour: idTour,
        email: feedbackBody.email,
        rating: feedbackBody.rating,
        comment: feedbackBody.comment
    })
    return feedback
}

const showListFeedback = async() => {
    const result = Feedback.find()
    return result
}

const showFeedbackPerTour = async(idTour) => {
     const feedbackPerTour = []
    const feedback = await Feedback.find().populate({path: 'idTour'})
    feedback.forEach(element => {
        if(element.idTour._id == idTour){
            feedbackPerTour.push({
                email: element.email,
                rating: element.rating,
                comment: element.comment
            })
        }
    });
    return feedbackPerTour
}

const deleteFeedback = async(idFeedback) => {
    const res = await Feedback.deleteOne({ _id: idFeedback})
    return res.deletedCount
}

module.exports = {
    createFeedback,
    showListFeedback,
    showFeedbackPerTour,
    deleteFeedback
}