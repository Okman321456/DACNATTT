const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const { userService } = require('../services')

const createUser = catchAsync(async(req, res) => {
    const user = await userService.createUser(req.body)

    res.status(httpStatus.CREATED).send(user)
})

const getAllUser = catchAsync(async(req, res) => {
    const users = await userService.getAllUser

    if (!users) res.status(httpStatus.NOT_FOUND).send("User not found")
    else res.status(200).send(users)
})

const getUserById = catchAsync(async(req, res) => {
    const user = await userService.getUserById(req.params.id)

    if (!user) res.status(httpStatus.NOT_FOUND).send("User not found")
    else res.status(200).send(user)
})

const updateUserById = catchAsync(async(req, res) => {
    const user = await userService.updateUserById(req.params.id, req.body)

    res.status(200).send(user)
})

const deleteUserById = catchAsync(async(req, res) => {
    await userService.deleteUserById(req.params.id)
    res.status(httpStatus.NO_CONTENT).send("User has been deleted")
})

module.exports = {
    createUser,
    getAllUser,
    getUserById,
    updateUserById,
    deleteUserById
}