const stackController = require("../controller/stack.controller")
const express = require("express")
const validateAdminToken = require("../middleware/validateAdminToken")

const stackRoute = express.Router()

stackRoute.get("/", stackController.getAllStack)
stackRoute.get("/:stackId", stackController.getStack)
stackRoute.post("/new/add", validateAdminToken, stackController.addStack)
stackRoute.patch("/update/:stackId", validateAdminToken, stackController.updateStack)
stackRoute.delete("/delete/:stackId", validateAdminToken, stackController.deleteStack)

module.exports = stackRoute