const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick')

const validate = (schema) => (req, res, next) => {
    // const keysObject = {...Object.keys(schema) }
    // for (let key in keysObject) {
    //     console.log(keysObject[key]);
    // }

    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));
    //console.log(validSchema);
    console.log(object);
    // const { value, error } = Joi.compile(validSchema)
    //     .prefs({ errors: { label: 'key' } })
    //     .validate(object);
    // if (error) {
    //     const errorMessage = error.details.map((details) => details.message).join(', ');
    //     console.log(errorMessage);
    //     return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    // }
    next()
}

module.exports = validate