require('dotenv').config()
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken')
const validator = require('validator')
var localStorage = require('localStorage')

const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { userService, authService } = require('../services')
const { authValidation, changePassValidation } = require('../validations')


/* define options expires token */
const options = {
    expiresIn: `${process.env.JWT_ACCESS_EXPIRATION_MINUTES}m`,
};

/* handle login with email and pass */
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
            role: user.role,
            email: user.email,
            token: accessToken
        })
    }
})


/* handle logout */
const logout = catchAsync(async(req, res) => {
    localStorage.removeItem('token')
    return res
        // .clearCookie("token")
        .status(200)
        .json({ message: "Log out Successfully" });
})

/* get role for account */
const getRole = catchAsync(async(req, res) => {
    if (!req.role) res.status(httpStatus.FORBIDDEN).send("Forbidden")
    res.status(200).json({
        role: req.role,
        name: req.name,
        email: req.email
    })

})

const changePass = catchAsync(async(req, res) => {
    const validationChangePass = await changePassValidation.validate(req.body)
    if (validationChangePass.error) {
        const errorMessage = validationChangePass.error.details[0].message
        return res.status(httpStatus.BAD_REQUEST).send({
            status: 400,
            message: errorMessage
        })
    }
    const { oldpass, newpass, confirmpass, email } = req.body
    const user = await authService.changePass(email, newpass)
    if (!user) res.status(httpStatus.BAD_REQUEST).json({
        status: 500,
        message: "Lỗi Server. Vui lòng thử lại!"
    })
    res.status(200).json({
        message: "Đổi mật khẩu thành công!"
    })
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