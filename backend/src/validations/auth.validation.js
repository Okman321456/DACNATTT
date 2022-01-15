const Joi = require('joi')

const authSchema = Joi.object({
    email: Joi.string()
        .trim()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .lowercase()
        .required(),
    password: Joi.string()
        .min(5)
        .max(32)
        .required()
})

module.exports = authSchema