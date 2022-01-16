const httpStatus = require('http-status')
const Joi = require('joi')
const validations = require('../validations')

const validate = (validator) => {
    return async(req, res, next) => {
        console.log(req.body);
        const validated = await validations[validator].validate(req.body)
        if (validated.error) {
            const errorMessage = validated.error.details[0].message
            return res.status(httpStatus.BAD_REQUEST).send({
                message: errorMessage
            })
        }
        req.body = validated
        next()
    }
}

module.exports = validate