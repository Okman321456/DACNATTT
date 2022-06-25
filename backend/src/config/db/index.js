require('dotenv').config();
const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect("mongodb+srv://nguyen29092000:nguyen20026293@cluster0.qn0ud.mongodb.net/?retryWrites=true&w=majority") //process.env.MONGODB_URL
        console.log("Connect Successfully")
    } catch (error) {
        console.log(error)
    }
}

module.exports = { connect }