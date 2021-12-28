const { User } = require('../models')

const authoriPermissonAdmin = async(id) => {
    const user = await User.findById(id)
    const role = user.role
    if (role == 'admin') return true
}

module.exports = {
    authoriPermissonAdmin
}