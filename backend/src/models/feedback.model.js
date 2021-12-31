const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    idTour: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Tour',
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        // validate(value) {
        //   if (!validator.isEmail(value)) {
        //     throw new Error('Invalid email');
        //   }
        // },
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    comment: {
        type: String,
        minlength: 0,
        maxlength: 300,
    }
}, {
    timestamps: true
})

const Feedback = mongoose.model('Feedback', ticketSchema)

module.exports = Feedback