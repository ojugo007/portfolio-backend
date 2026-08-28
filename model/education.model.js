const mongoose = require('mongoose')

const EducationSchema = new mongoose.Schema({
    institution: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    period: { type: String, required: true, trim: true },
    course: { type: String, required: true },
    order: { type: Number, default: 0 }, 
}, { timestamps: true })


const EducationModel = mongoose.model("education", EducationSchema)

module.exports = EducationModel