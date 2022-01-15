const Joi = require('joi');

const createNews = {
    body: Joi.object().keys({
        title: Joi.string().min(0).max(100).required(),
        description: Joi.string().min(20).max(2048).required(),
    }),
    file: Joi.object().keys({
        path: Joi.string().max(500).required()
    })
}
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
        .required()
})


module.exports = newsSchema