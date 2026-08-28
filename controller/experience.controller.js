const experienceService = require("../service/experience.service")


const getAllExperience = async (req, res) => {
    const response = await experienceService.getAllExperience()
    return res.status(response.code).json({ message: response.message, success: response.success, data: response.data })
}

const getExperienceById = async (req, res) => {
    const { experienceId } = req.params
    if (!experienceId) {
        return res.status(404).json({ message: "experience record with the Id not found", data: null, success: false })
    }
    const response = await experienceService.getExperienceById(experienceId)
    return res.status(response.code).json({ message: response.message, data: response.data, success: response.success })
}

const addExperience = async (req, res) => {
    const { company, role, period, desc, order } = req.body;
    if (!company || !role || !period || !desc || !order) {
        return res.status(400).json({ message: "all fields required", data: null, success: false })
    }
    const response = await experienceService.addExperience({ company, role, period, desc, order })

    return res.status(response.code).json({ message: response.message, data: response.data, success: response.success })
}

const updateExperience = async (req, res) => {
    const { experienceId } = req.params;
    const { company, role, period, desc, order } = req.body;
    if (!experienceId) {
        return res.status(400).json({ message: "record id missing in parameters", data: null, success: false })
    }
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "at least one field is required to carry out this action",
            data: null,
            success: false
        });
    }
    const response = await experienceService.updateExperience({experienceId, company, role, period, desc, order });

    return res.status(response.code).json({message:response.message, data: response.data, success: response.success})
}

const deleteExperience = async (req, res) => {
    const {experienceId} = req.params;
    if (!experienceId) {
        return res.status(400).json({ message: "record id missing in parameters", data: null, success: false })
    }
    const response = await experienceService.deleteExperience(experienceId)
    return res.status(response.code).json({message:response.message, data:response.data, success:response.success })
}

module.exports = {
    getAllExperience,
    getExperienceById,
    addExperience,
    updateExperience,
    deleteExperience
}