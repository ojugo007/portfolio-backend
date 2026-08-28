const AdminModel = require("../model/admin.model");
const jwt = require("jsonwebtoken")
require("dotenv").config()

const Login = async (email, password) => {
    const SECRET_KEY = process.env.JWT_SECRET
    if (!SECRET_KEY) {
        console.error("JWT_SECRET is not set in environment variables")
    }
    try {
        const isAdmin = await AdminModel.findOne({ email }).select("+password")
        if (!isAdmin) {
            return {
                message: "account with email does not exist",
                data: null,
                code: 404,
                success: false
            }
        }
        const validPass = await isAdmin.passwordValid(password)
        if (!validPass) {
            return {
                message: "invalid password",
                data: null,
                code: 401,
                success: false
            }
        }

        const token = await jwt.sign({ id: isAdmin._id, email: isAdmin.email }, SECRET_KEY, { expiresIn: '7h' })
        return {
            message: "log in successful",
            data: { id: isAdmin._id, email: isAdmin.email, token },
            code: 200,
            success: true
        }

    } catch (error) {
        console.error("Login error:", error.message)
        return {
            message: "Something went wrong",
            data: null,
            code: 500,
            success: false
        }
    }
}

module.exports = {
    Login
}