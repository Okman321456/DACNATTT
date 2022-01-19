const catchAsync = require('../utils/catchAsync')
const httpStatus = require('http-status')
const validator = require('validator')
const { userService } = require('../services')
const { userValidation } = require('../validations')

const createUser = catchAsync(async(req, res) => {
    if (!validator.isEmail(req.body.email)) {
        res.status(httpStatus.BAD_REQUEST).send('Email không hợp lệ!')
    }
    const validation = await userValidation.validate(req.body)
    if (validation.error) {
        const errorMessage = validation.error.details[0].message
        return res.status(httpStatus.BAD_REQUEST).send({
            message: errorMessage
        })
    }
    const user = await userService.createUser(req.body)

    res.status(httpStatus.CREATED).send(user)
})

const signUp = catchAsync(async(req, res) => {
    const userAccount = await userService.signUp(req.body)
    res.send(userAccount);
})

const getAllUser = catchAsync(async(req, res) => {
    const users = await userService.getAllUser()

    if (!users) res.status(httpStatus.NOT_FOUND).send("User not found")
    else res.status(200).send(users)
})

const getUserById = catchAsync(async(req, res) => {
    const user = await userService.getUserById(req.params.id)

    if (!user) res.status(httpStatus.NOT_FOUND).send("User not found")
    else res.status(200).send(user)
})

const updateUserById = catchAsync(async(req, res) => {
    if (!validator.isEmail(req.body.email)) {
        res.status(httpStatus.BAD_REQUEST).send('Email không hợp lệ!')
    }
    const validation = await userValidation.validate(req.body)
    if (validation.error) {
        const errorMessage = validation.error.details[0].message
        return res.status(httpStatus.BAD_REQUEST).send({
            message: errorMessage
        })
    }
    const user = await userService.updateUserById(req.params.id, req.body)

    res.status(200).send(user)
})

const deleteUserById = catchAsync(async(req, res) => {
    await userService.deleteUserById(req.params.id)
    res.status(httpStatus.NO_CONTENT).send()
})

module.exports = {
    createUser,
    getAllUser,
    getUserById,
    updateUserById,
    deleteUserById,
}