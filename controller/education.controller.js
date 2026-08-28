const EducationService = require("../service/education.service")

const addEducation = async(req, res)=>{
    const {institution, role, period, course, order} = req.body;
    if(!institution||!role||!period||!course||!order ){
        return res.status(400).json({message:"all fields are required", data: null, success: false})
    }
    const response = await EducationService.addEducation({institution, role, period, course, order})

    return res.status(response.code).json({message:response.message, data:response.data, success:response.success})
}

const updateEducation = async(req, res)=>{
    const {educationId} = req.params;
    const {institution, role, period, course, order} = req.body

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "at least one field is required to carry out this action",
            data: null,
            success: false
        });
    }

    const response = await EducationService.updateEducation({educationId, institution, role, period, course, order})

    return res.status(response.code).json({message:response.message, data:response.data, success:response.success})
}

const getEducationById = async(req, res)=>{
    const {educationId} = req.params;

    if(!educationId){
        return res.status(400).json({message : "bad request, no id parameter found", data:null, success: false})
    }

    const response = await EducationService.getEducationById(educationId);

    return res.status(response.code).json({message:response.message, data: response.data, success: response.success})
}

const getAllEducation = async(req, res)=>{
    const response = await EducationService.getAllEducation();

    return res.status(response.code).json({message:response.message, data: response.data, success: response.success})
}

const removeEducation = async(req, res)=>{
    const {educationId} = req.params;

    if(!educationId){
        return res.status(400).json({message : "bad request, no id parameter found", data:null, success: false})
    }
    const response = await EducationService.removeEducation(educationId)

    return res.status(response.code).json({message:response.message, data: response.data, success:response.success})

}


module.exports = {
    addEducation,
    updateEducation,
    getEducationById,
    getAllEducation,
    removeEducation
}