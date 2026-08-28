const express = require("express")
const experienceController = require("../controller/experience.controller")
const validateAdminToken = require("../middleware/validateAdminToken")

const experienceRoute = express.Router()


experienceRoute.get("/", experienceController.getAllExperience )
experienceRoute.get("/:experienceId", experienceController.getExperienceById)
experienceRoute.post("/add-new", validateAdminToken ,experienceController.addExperience )
experienceRoute.patch("/update/:experienceId", validateAdminToken, experienceController.updateExperience )
experienceRoute.delete("/delete/:experienceId", validateAdminToken, experienceController.deleteExperience)


module.exports = experienceRoute