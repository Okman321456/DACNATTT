const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { userService } = require('../services');

const checkChangePass = catchAsync(async(req, res, next) => {
    const userId = req.userId
    console.log(req.userId);
    const user = await userService.getUserById(userId)
    if (!user || !(await user.isPasswordMatch(password))) {
        res.status(httpStatus.UNAUTHORIZED).send('Invalid password')
    }
    req.email = user.email
    next()
})

module.exports = checkChangePass