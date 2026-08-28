const express = require("express")
const messageController = require("../controller/message.controller")
const validateAdminToken = require("../middleware/validateAdminToken")
const { validate } = require("../model/message.model")
const { messageLimiter } = require("../middleware/rateLimiter")
const messageRoute = express.Router()


// get all (adminvalidationToken needed)
messageRoute.get("/", validateAdminToken, messageController.getAllMessage)

// get (adminvalidationToken needed)
messageRoute.get("/:messageId", validateAdminToken, messageController.getMessage)

// post  (no adminValidationToken)
messageRoute.post("/send-message",messageLimiter ,messageController.sendMessage )

// ( adminValidationToken)
messageRoute.post("/generate-response/:messageId", validateAdminToken, messageController.generateMessage)
messageRoute.post("/:messageId/send-response", validateAdminToken, messageController.sendResponse)

// delete ( adminValidationToken)
messageRoute.delete("/delete/:messageId", validateAdminToken, messageController.deleteMessage)

module.exports = messageRoute