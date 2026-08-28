const mongoose = require("mongoose")

const CaseStudySchema = new mongoose.Schema({
    overview: String,
    challenge: String,
    solution: String,
    workflow: [String],
    technologies: [String],
    results: [String],
    takeaway: String,
}, { _id: false })

const ProjectSchema = new mongoose.Schema({
    projectTitle: { type: String, required: true, trim: true },
    projectDesc: { type: String, required: true },
    projectImage: { type: String, required: true },
    caseStudy: CaseStudySchema,
    order: { type: Number, default: 0 },
}, { timestamps: true })

const ProjectModel = mongoose.model("Project", ProjectSchema)
module.exports = ProjectModel

