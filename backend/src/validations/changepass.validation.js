const Joi = require('joi')
const { password } = require('./custom.validation')

const changePassValidation = Joi.object({
    email: Joi.string()
        .trim()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .lowercase()
        .required(),
    oldpass: Joi.string()
        .min(5)
        .custom(password)
        .required(),
    newpass: Joi.string()
        .min(5)
        .custom(password)
        .required(),
    confirmpass: Joi.any()
        .custom(password)
        .required()
        .valid(Joi.ref('newpass'))
        .required()
})

module.exports = changePassValidation