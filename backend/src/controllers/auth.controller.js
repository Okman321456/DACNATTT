const httpStatus = require('http-status');
const jwt = require('jsonwebtoken')
var localStorage = require('localStorage')

const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

require('dotenv').config()

const { userService } = require('../services')

const options = {
    expiresIn: Number(process.env.JWT_ACCESS_EXPIRATION_MINUTES),
};

const login = catchAsync(async(req, res) => {
    const { email, password } = req.body
    const user = await userService.getUserByEmail(email)
    if (!user || !(await user.isPasswordMatch(password))) {
        res.status(httpStatus.UNAUTHORIZED).send('Incorrect email or password')
    }

    const payloadLogin = { id: user._id.toString() }
    const accessToken = jwt.sign(payloadLogin, process.env.JWT_SECRET, options)
        // res.cookie('token', accessToken);
    localStorage.setItem('token', accessToken);
    res.status(200).json({
        name: user.name,
        permission: user.role
    });
})

const logout = catchAsync(async(req, res) => {
    localStorage.removeItem('token')
    return res
        // .clearCookie("token")
        .status(200)
        .json({ message: "Log out Successfully" });
})

const refreshTokens = catchAsync(async(req, res) => {

})


module.exports = {
    login,
    logout,
    refreshTokens
}