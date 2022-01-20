const Joi = require('joi')
const { password } = require('./custom.validation')
const userSchema = Joi.object({
    name: Joi.string()
        .min(5)
        .max(100)
        .required(),
    password: Joi.string()
        .min(5)
        .custom(password)
        .required(),
    email: Joi.string()
        .trim()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .lowercase()
        .required(),
    phone: Joi.string()
        .min(0)
        .max(10)
        .required()
})


module.exports = userSchema