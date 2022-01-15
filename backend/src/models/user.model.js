const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const validator = require('validator')
const roles = require('../config/roles')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true,
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true,
        validate(value) {
            if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                throw new Error('Password must contain at least one letter and one number');
            }
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email');
            }
        },
    },
    phone: {
        type: String,
        minlength: 0,
        maxlength: 10,
        required: true,
    },
    role: {
        type: String,
        enum: roles,
        default: 'manage',
    }
}, {
    timestamps: true
})

userSchema.statics.isEmailTaken = async function(email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
}

userSchema.methods.isPasswordMatch = async function(password) {
    const user = this
    return bcrypt.compare(password, user.password)
};


userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User