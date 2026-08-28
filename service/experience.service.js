const ExperienceModel = require("../model/experience.model")

const getAllExperience = async()=>{
    const experienceRecords = await ExperienceModel.find({})
    if(experienceRecords.length === 0){
        return{
            message : "no experience record available",
            data: [],
            code: 200,
            success: true
        }
    }
    return {
        message : "experience record retrieved successfully",
        data: experienceRecords,
        code : 200,
        success : true
    }
}

const getExperienceById = async(experienceId)=>{
    const experienceRecord = await ExperienceModel.findById({_id:experienceId})
    if(!experienceRecord){
        return{
            message : "no experience record with the id found",
            data: null,
            code: 404,
            success: false
        }
    }

    return {
        message : "experience record retrieved successfully",
        data: experienceRecord,
        code : 200,
        success : true
    }
}

const addExperience = async({company, role ,period ,desc, order})=>{
    const newExperienceRecord = await ExperienceModel.create({company, role ,period ,desc, order})
    return {
        message: " New experience successfuly added",
        data: newExperienceRecord,
        success: true,
        code: 201
    }
}

const updateExperience = async({experienceId, company, role, period, desc, order})=>{
    const experienceRecord = await ExperienceModel.findById({_id:experienceId})
    if(!experienceRecord){
        return{
            message:"experience record with the id not found",
            code: 404,
            success:false,
            data: null
        }
    }

    if (company !== undefined) {
        experienceRecord.company = company;
    }

    if (role !== undefined) {
        experienceRecord.role = role;
    }

    if (period !== undefined) {
        experienceRecord.period = period;
    }

    if (desc !== undefined) {
        experienceRecord.desc = desc;
    }

    if (order !== undefined) {
        experienceRecord.order = order;
    }

    await experienceRecord.save();
    return {
        message: "Experience record updated successfully",
        data: experienceRecord,
        success: true,
        code: 200
    };
}

const deleteExperience = async(experienceId)=>{
    const experienceRecord = await ExperienceModel.findByIdAndDelete({_id:experienceId})
    return {
        message: " record deleted successfully",
        code : 200,
        data: null,
        success: true
    }
}

module.exports = {
    getAllExperience,
    getExperienceById,
    addExperience,
    updateExperience,
    deleteExperience
}