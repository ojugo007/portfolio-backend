const EducationModel = require("../model/education.model")


const addEducation = async ({ institution, role, period, course, order }) => {
    const education = await EducationModel.create({ institution, role, period, course, order })
    return {
        message: " New education successfuly added",
        data: education,
        success: true,
        code: 201
    }
}

const updateEducation = async ({ educationId, institution, role, period, course, order }) => {

    const education = await EducationModel.findOne({ _id: educationId });

    if (!education) {
        return {
            message: "Education record not found",
            data: null,
            success: false,
            code: 404
        };
    }

    if (institution !== undefined) {
        education.institution = institution;
    }

    if (role !== undefined) {
        education.role = role;
    }

    if (period !== undefined) {
        education.period = period;
    }

    if (course !== undefined) {
        education.course = course;
    }

    if (order !== undefined) {
        education.order = order;
    }

    await education.save();

    return {
        message: "Education record updated successfully",
        data: education,
        success: true,
        code: 200
    };
};

const getEducationById = async (educationId) => {
    const education = await EducationModel.findOne({ _id: educationId })
    if (!education) {
        return {
            message: "Education record not found id",
            data: null,
            success: false,
            code: 404
        };
    }

    return {
        message: "Education record found",
        data: education,
        success: true,
        code: 200
    };

}



const getAllEducation = async () => {
    const educationRecords = await EducationModel.find()
    if (educationRecords.length === 0) {
        return {
            message: "Education records not found",
            data: [],
            success: true,
            code: 200
        };
    }

    return {
        message: "Education records found successfully",
        data: educationRecords,
        success: true,
        code: 200
    };
}

const removeEducation = async (educationId) => {
    const education = await EducationModel.findByIdAndDelete(educationId)
    if (!education) {
        return {
            message: "education record with the id does not exist",
            data: null,
            code: 404,
            success: false
        }
    }
    return {
        message: "successfully deleted education record ",
        data: null,
        code: 200,
        success: true
    }

}

module.exports = {
    addEducation,
    updateEducation,
    getEducationById,
    getAllEducation,
    removeEducation
}