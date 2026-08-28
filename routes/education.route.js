const express = require("express")
const validateAdminToken = require("../middleware/validateAdminToken")
const EducationController = require("../controller/education.controller")
const educationRoute = express.Router()


educationRoute.get("/", EducationController.getAllEducation)
educationRoute.get("/:educationId", EducationController.getEducationById)
educationRoute.post("/add", validateAdminToken, EducationController.addEducation)
educationRoute.patch("/update/:educationId", validateAdminToken, EducationController.updateEducation)
educationRoute.delete("/delete/:educationId", validateAdminToken, EducationController.removeEducation)


module.exports = educationRoute