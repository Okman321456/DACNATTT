const Joi = require('joi');

const tourSchema = Joi.object({
    name: Joi.string()
        .min(0)
        .max(100)
        .required(),
    description: Joi.string()
        .min(20)
        .max(1024)
        .required(),
    price: Joi.number()
        .min(0)
        .max(100000000)
        .required(),
    timeStart: Joi.date()
        .required(),
    timeEnd: Joi.date()
        .required(),
    amount: Joi.number()
        .min(0)
        .max(50)
        .required(),
    hotelName: Joi.string()
        .min(0)
        .max(100)
        .required(),
    region: Joi.number()
        .min(1)
        .max(3)
        .required(),
    typePlace: Joi.string()
        .min(0)
        .required(),
    discount: Joi.number()
        .min(0)
        .max(1)
        .required(),
    schedule: Joi.string()
        .min(20)
        .max(1024)
        .required(),
    imageUrl: Joi.string()
        .max(500)
        .required()
})

module.exports = tourSchema