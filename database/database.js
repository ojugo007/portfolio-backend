const mongoose = require("mongoose")
require("dotenv").config()

const MONGO_DB_URI = process.env.MONGO_DB_URI

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_DB_URI)
        console.log(`database connected successfully :${conn.connection.host}`)
    } catch (error) {
        console.error("error, can not connect to database", error.message)
        process.exit(1)
    }
}


module.exports = {connectDB}
