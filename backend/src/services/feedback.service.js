const {Feedback} = require('../models')
const {User} = require('../models')
const {Tour} = require('../models')

const createFeedback = async(idTour, feedbackBody) => {
    const user = await User.findOne({email: feedbackBody.email})
    if(user) {
        const userId = user._id
        const feedback = await Feedback.create({
            idTour: idTour,
            idUser: userId,
            rating: feedbackBody.rating,
            comment: feedbackBody.comment
        })
        return feedback
    }
    else {
        console.log('Email Không Chính Xác')
        return null
    }

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
                idUser: element.idUser,
                rating: element.rating,
                comment: element.comment
            })
        }
    });
    return feedbackPerTour
}

module.exports = {
    createFeedback,
    showListFeedback,
    showFeedbackPerTour
}