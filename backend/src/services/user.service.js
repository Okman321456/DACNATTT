const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const nodeMailer = require('nodemailer');

const adminEmail = process.env.EMAIL;
const adminPassword = process.env.EMAILPASS;
const mailHost = 'smtp.gmail.com';
const mailPort = 587;

const createUser = async(userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists')
    }
    // random va luu localstorage
    transporter.sendMail({
        to: userBody.email,
        from: adminEmail,
        subject: 'Confirm booking ticket',
        text: 'Hello mother fucker'
    });
    // check
    const user = await User.create(userBody)
    return user
}
const getAllUser = async() => {
    return User.find({
        role: { $ne: 'admin' }
    })
}

const getUserById = async(id) => {
    return User.findById(id)
}

const getUserByEmail = async(email) => {
    return User.findOne({ email });
};

const updateUserById = async(userId, updateBody) => {
    const user = await getUserById(userId)
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }
    if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists')
    }
    Object.assign(user, updateBody)
    await user.save()
    return user
}

const deleteUserById = async(userId) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
    }
    await user.remove()
    return user
}

const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false, // nếu các bạn dùng port 465 (smtps) thì để true, còn lại hãy để false cho tất cả các port khác
    auth: {
        user: adminEmail,
        pass: adminPassword
    }
});



module.exports = {
    createUser,
    getAllUser,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById,
};