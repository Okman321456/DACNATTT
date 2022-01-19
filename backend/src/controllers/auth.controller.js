require('dotenv').config()
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken')
const validator = require('validator')
var localStorage = require('localStorage')

const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { userService } = require('../services')
const { authValidation } = require('../validations')

const options = {
    expiresIn: `${process.env.JWT_ACCESS_EXPIRATION_MINUTES}m`,
};

const login = catchAsync(async(req, res) => {
    if (!validator.isEmail(req.body.email)) {
        res.status(httpStatus.BAD_REQUEST).send('Email không hợp lệ!')
    }
    const validation = await authValidation.validate(req.body)
    if (validation.error) {
        const errorMessage = validation.error.details[0].message
        return res.status(httpStatus.BAD_REQUEST).send({
            message: errorMessage
        })
    }

    const { email, password } = req.body
    const user = await userService.getUserByEmail(email)
    if (!user || !(await user.isPasswordMatch(password))) {
        res.status(httpStatus.UNAUTHORIZED).send('Incorrect email or password')
    } else {
        const payloadLogin = { id: user._id.toString() }
        console.log(options);
        const accessToken = jwt.sign(payloadLogin, process.env.JWT_SECRET, options)
            // res.cookie('token', accessToken);
        localStorage.setItem('token', accessToken)
        res.status(200).json({
            name: user.name,
            permission: user.role,
            email: user.email,
            token: accessToken
        })
    }
})

const logout = catchAsync(async(req, res) => {
    localStorage.removeItem('token')
    return res
        // .clearCookie("token")
        .status(200)
        .json({ message: "Log out Successfully" });
})

const getRole = catchAsync(async(req, res) => {

    if (!req.role) res.status(httpStatus.FORBIDDEN).send("Forbidden")
    res.status(200).json({
        role: req.role,
        name: req.name,
        email: req.email
    })

})

const changePass = catchAsync(async(req, res) => {
    res.send(req.email);
})

const refreshTokens = catchAsync(async(req, res) => {

})


module.exports = {
    login,
    logout,
    getRole,
    changePass,
    refreshTokens
}