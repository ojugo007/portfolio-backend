const ProjectModel = require("../model/projects.model")
const cloudinary = require("../integration/cloudinary")
const fs = require("fs")
const path = require("path")

const addProject = async ({ projectTitle, projectDesc, projectImage, caseStudy, order }) => {
    const { overview, challenge, solution, workflow, technologies, results, takeaway } = caseStudy || {}

    let projectImageUrl;

    if (projectImage?.path) {
        const publicId = `project-image/${projectTitle}-${Date.now()}`;
        const uploadResult = await cloudinary.uploader.upload(projectImage.path, { public_id: publicId })

        projectImageUrl = cloudinary.url(uploadResult.public_id, {
            crop: "auto",
            gravity: "auto",
            width: 500,
            height: 500
        });

        try {
            await fs.unlink(path.normalize(projectImage.path))
            console.log("successfully deleted file")
        } catch (error) {
            console.log("unable to delete file")
        }

        const project = await ProjectModel.create({
            projectTitle,
            projectDesc,
            projectImage: projectImageUrl,
            caseStudy: {
                overview,
                challenge,
                solution,
                workflow,
                technologies,
                results,
                takeaway
            },
            order
        })

        return {
            message: "Project successfully added",
            data: project,
            success: true,
            code: 201
        };
    }
}

const getProject = async(projectId) => {
    const project = await ProjectModel.findById(projectId);
    if(!project){
        return {
            message: "project with the id does not found",
            code : 404,
            success: false,
            data: null
        }
    }
    return {
        message : "project retrieved successfully",
        code : 200,
        success : true,
        data : project
    }
}

const getAllProject = async()=>{
    const projects = await ProjectModel.find()
    if(projects.length === 0){
        return {
            message: "projects not available",
            code : 200,
            success: true,
            data: []
        }
    }
    return{
        message: "projects successfully retrieved ",
        code : 200,
        success: true,
        data: projects
    }
}

const deleteProject = async(projectId)=>{
    const project = await ProjectModel.findByIdAndDelete(projectId)
    if (!project) {
        return {
            message: "project not found",
            code: 404,
            success: false,
            data: null
        };
    }
    return{
        message: "project successfully deleted",
        code: 200,
        success: true,
        data: null
    }
}

const updateProject = async ({
        projectId,
        projectTitle,
        projectDesc,
        caseStudy,
        projectImage,
        order
    }) => {

    const project = await ProjectModel.findById(projectId);

    if (!project) {
        return {
            message: "project not found for update",
            data: null,
            success: false,
            code: 404
        };
    }

    if (projectTitle !== undefined) {
        project.projectTitle = projectTitle;
    }

    if (projectDesc !== undefined) {
        project.projectDesc = projectDesc;
    }

    if (order !== undefined) {
        project.order = order;
    }

    if (caseStudy !== undefined) {
        project.caseStudy = {
            ...project.caseStudy?.toObject?.(),
            ...caseStudy
        };
    }

    if (projectImage?.path) {

        const publicId = `project-image/${project.projectTitle}-${Date.now()}`;

        const uploadResult = await cloudinary.uploader.upload(
            projectImage.path,
            {
                public_id: publicId
            }
        );

        const autoCropUrl = cloudinary.url(uploadResult.public_id, {
            crop: "auto",
            gravity: "auto",
            width: 500,
            height: 500
        });

        project.projectImage = autoCropUrl;

        try {
            await fs.unlink(path.normalize(projectImage.path));
            console.log("successfully deleted temporary file");
        } catch (error) {
            console.log("unable to delete temporary file");
        }
    }

    await project.save();

    return {
        message: "Project successfully updated",
        data: project,
        success: true,
        code: 200
    };
};

module.exports = {
    addProject,
    getProject,
    getAllProject,
    deleteProject,
    updateProject
}