const AuthController = require("../controller/auth.controller")
const express = require("express");
const { loginLimiter } = require("../middleware/rateLimiter");


const authRoute = express.Router();

authRoute.post("/signin", loginLimiter, AuthController.Login)

module.exports = authRoute;