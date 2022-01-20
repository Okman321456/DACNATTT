const Joi = require('joi');

const ticketSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    
    phone: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    numberPeople: Joi.number()
        .integer()
        .min(1)
        .max(5),

    email: Joi.string()
        .email({allowFullyQualified: true})
        .required()
})

module.exports = ticketSchema