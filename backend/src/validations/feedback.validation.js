const Joi = require('joi');

const feedbackSchema = Joi.object({
    comment: Joi.string()
        .min(5)
        .max(300)
        .required(),
        
    idTour: Joi.string()
        .required(),
    rating: Joi.number()
        .integer()
        .min(1)
        .max(5)
        .required(),

    email: Joi.string()
        .email({allowFullyQualified: true})
        .required()
})

module.exports = feedbackSchema