const jwt = require("jsonwebtoken")
const AdminModel = require("../model/admin.model")

const validateAdminToken = async (req, res, next) => {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) return res.status(401).json({ message: "unauthorized, no bearer token", data: null, success: false })

    const token = bearerToken.split(" ")[1]
    const SECRET_KEY = process.env.JWT_SECRET
    try {
        const decodeToken = jwt.verify(token, SECRET_KEY)

        const admin = await AdminModel.findOne({ _id: decodeToken.id, email: decodeToken.email })

        if (!admin) {
            return res.status(401).json({ message: "unauthorized access denied", data: null, success: false })
        }

        req.admin = admin
        next()
    } catch (error) {
        console.log(error.message)

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Session expired, please log in", data: null, success: false })
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: error.message, data: null, success: false })
        }

    }
}

module.exports = validateAdminToken