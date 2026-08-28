const testimonialController = require("../controller/testimonial.controller")
const express = require("express")
const multer = require("multer")
const validateAdminToken = require("../middleware/validateAdminToken")


const upload = multer({ dest: 'uploads/' })
const testimonialRoute = express.Router()

testimonialRoute.get("/" , testimonialController.getAllTestimonial)
testimonialRoute.get("/:testimonialId", testimonialController.getTestimonial)
testimonialRoute.post("/new/add", validateAdminToken, upload.single("avatar"), testimonialController.addTestimonial)
testimonialRoute.delete("/delete/:testimonialId", validateAdminToken, testimonialController.deleteTestimonial)
testimonialRoute.patch("/update/:testimonialId", validateAdminToken, upload.single("avatar"), testimonialController.updateTestimonial)





module.exports = testimonialRoute