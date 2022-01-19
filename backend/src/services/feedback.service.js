const { Feedback } = require('../models')
const { feedbackValidation } = require('../validations')

const createFeedback = async(idTour, feedbackBody) => {
    try {
        const validation = feedbackValidation.validate(feedbackBody)
        if (!validation.error) {
            const feedback = await Feedback.create({
                idTour: idTour,
                email: validation.value.email,
                rating: validation.value.rating,
                comment: validation.value.comment
            })
            return feedback
        } else return null
    } catch (err) {
        console.log(err)
        return null
    }
}

const showListFeedback = async() => {
    const result = Feedback.find()
    return result
}

const showFeedbackPerTour = async(idTour) => {
    const feedbackPerTour = []
    const feedback = await Feedback.find().populate({ path: 'idTour' })
    feedback.forEach(element => {
        if (element.idTour._id == idTour) {
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
    const res = await Feedback.deleteOne({ _id: idFeedback })
    return res.deletedCount
}

module.exports = {
    createFeedback,
    showListFeedback,
    showFeedbackPerTour,
    deleteFeedback
}