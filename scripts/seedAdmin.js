// scripts/seedAdmin.js
require("dotenv").config()
const mongoose = require("mongoose")
const readline = require("readline")
const AdminModel = require("../model/admin.model") // adjust path to match your project

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const ask = (question) =>
    new Promise((resolve) => rl.question(question, resolve))

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Connected to database")

        const existing = await AdminModel.countDocuments()
        if (existing > 1) {
            console.log("An admin already exists. Aborting to avoid duplicates.")
            process.exit(0)
        }

        const email = await ask("Admin email: ")
        const password = await ask("Admin password: ")

        if (!email || !password) {
            console.log("Email and password are required.")
            process.exit(1)
        }

        const admin = new AdminModel({ email, password })
        await admin.save() // pre("save") hook hashes the password automatically

        console.log(`Admin created successfully: ${admin.email}`)
        process.exit(0)
    } catch (error) {
        console.error("Failed to seed admin:", error.message)
        process.exit(1)
    } finally {
        rl.close()
    }
}

seedAdmin()