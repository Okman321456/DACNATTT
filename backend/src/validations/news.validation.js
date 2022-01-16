const Joi = require('joi');

const newsSchema = Joi.object({
    title: Joi.string()
        .min(0)
        .max(100)
        .required(),

    description: Joi.string()
        .min(20)
        .max(2048)
        .required(),
    imageUrl: Joi.string()
        .max(500)
})


module.exports = newsSchema