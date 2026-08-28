const myServicesController = require("../controller/myServices.controller")
const express = require("express")
const validateAdminToken = require("../middleware/validateAdminToken")

const myServiceRoute = express.Router()

myServiceRoute.get("/", myServicesController.getAllService)
myServiceRoute.get("/:serviceId", myServicesController.getService)
myServiceRoute.post("/new/add", validateAdminToken, myServicesController.addService)
myServiceRoute.patch("/update/:serviceId", validateAdminToken, myServicesController.updateService)
myServiceRoute.delete("/delete/:serviceId", validateAdminToken, myServicesController.deleteService)

module.exports = myServiceRoute