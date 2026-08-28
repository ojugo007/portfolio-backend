const projectController = require("../controller/project.controller")
const express = require("express")
const validateAdminToken = require("../middleware/validateAdminToken")
const multer = require("multer")
const upload = multer({ dest: 'uploads/' })


const projectRoute = express.Router()

projectRoute.post("/new/add", validateAdminToken, upload.single("projectImage"), projectController.addProject)
projectRoute.get("/:projectId", projectController.getProject)
projectRoute.get("/" , projectController.getAllProject)
projectRoute.delete("/delete/:projectId", validateAdminToken, projectController.deleteProject)
projectRoute.patch("/update/:projectId", validateAdminToken, upload.single("projectImage"), projectController.updateProject)

module.exports = projectRoute