const Joi = require('joi');
const { objectId } = require('./custom.validation');

const tourParamsSchema = Joi.object({
    tourId: Joi.string()
        .custom(objectId)
        .required()
})

module.exports = tourParamsSchema