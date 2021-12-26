const mongoose = require('mongoose')

const tourSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 0,
        maxlength: 100,
        required: true,
    },
    description: {
        type: String,
        minlength: 20,
        maxlength: 1024,
        required: true
    },
    imageUrl: {
        type: String,
        maxlength: 500,
        trim: true
    },
    price: {
        type: Number,
        require: true,
        min: 0,
        max: 100000000
    },
    timeStart: {
        type: Date,
        required: true,
    },
    timeEnd: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        require: true,
        min: 1,
        max: 5
    },
    hotel_name: {
        type: String,
        minlength: 0,
        maxlength: 100,
        required: true,
    },
    region: {
        type: Number,
        min: 1,
        max: 3,
        required: true,
    },
    type_place: {
        type: String,
        minlength: 0,
        required: true,
    },
    list_feedback: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'Feedback',
    }
}, {
    timestamps: true
})

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour