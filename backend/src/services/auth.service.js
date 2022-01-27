const { User } = require('../models')
const { userService } = require('../services')

const authoriPermissonAdmin = async(id) => {
    const user = await User.findById(id)
    const role = user.role
    if (role == 'admin') return true
}

const changePass = async(email, password) => {
    const user = await userService.getUserByEmail(email)
    Object.assign(user, { password })
    await user.save()
    return user
}

module.exports = {
    authoriPermissonAdmin,
    changePass
}