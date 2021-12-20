require('dotenv').config();
const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connect Successfully")
    } catch (error) {
        console.log("Connect Failed")
    }
}

module.exports = { connect }