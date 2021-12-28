const httpStatus = require('http-status');
const jwt = require('jsonwebtoken')

const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
require('dotenv').config()

const { userService, authService } = require('../services')

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
    res.cookie('token', accessToken);
    res.status(200).json({ message: "Log in successfully" });
})

const authorization = async(req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(httpStatus.FORBIDDEN).send("You don't have permission");
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = data.id;
        if (await authService.authoriPermissonAdmin(req.userId))
            return next()
        else return res.status(httpStatus.UNAUTHORIZED).send("You don't have permission admin")
            // return next()
    } catch {
        return res.status(httpStatus.FORBIDDEN).send("Error authorization");
    }
}

const logout = catchAsync(async(req, res) => {
    return res
        .clearCookie("token")
        .status(200)
        .json({ message: "Successfully log out" });
})

module.exports = {
    login,
    authorization,
    logout
}