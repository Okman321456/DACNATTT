const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    idTour: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Tour',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    numberPeople: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    status: {
        type: Number,
        min: 0,
        max: 3,
        required: true,
    },

    numberPeople: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    }

}, {
    timestamps: true
})

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket