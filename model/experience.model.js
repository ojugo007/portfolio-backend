const mongoose = require('mongoose')

const ExperienceSchema = new mongoose.Schema({
    company: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    period: { type: String, required: true, trim: true },
    desc: { type: String, required: true },
    order: { type: Number, default: 0 },
}, { timestamps: true })


const ExperienceModel = mongoose.model("experience", ExperienceSchema)

module.exports = ExperienceModel    