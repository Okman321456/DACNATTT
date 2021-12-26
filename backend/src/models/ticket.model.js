const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    idTour: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Tour',
        required: true,
    },
    idUser: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: Number,
        min: 0,
        max: 3
    },
    discount: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket