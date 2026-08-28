const projectService = require("../service/project.service")

const addProject = async(req, res)=>{
    const projectImage = req.file;
    const { projectTitle, projectDesc, caseStudy, order } = req.body;
    
    if (!projectTitle || !projectDesc || !projectImage) {
        return res.status(400).json({
            message: "project title, description and image are required",
            data: null,
            success: false
        });
    }

    let parsedCaseStudy;
    try {
        parsedCaseStudy = caseStudy ? JSON.parse(caseStudy) : undefined;
    } catch (error) {
        return res.status(400).json({
            message: "Invalid case study JSON",
            data: null,
            success: false
        });
    }


    const response = await projectService.addProject({
        projectTitle,
        projectDesc,
        projectImage,
        caseStudy: parsedCaseStudy,
        order
    });

    return res.status(response.code).json({
        message: response.message,
        data: response.data,
        success: response.success
    });
}

const getProject = async(req, res) => {
    const {projectId} = req.params;
    if(!projectId){
        return res.status(400).json({mesaage: "id parameter is missing", success: false, data: null})
    };

    const response = await projectService.getProject(projectId)
    return res.status(response.code).json({mesaage: response.message, success: response.success, data: response.data})
}

const getAllProject = async(req, res)=>{
    const response = await projectService.getAllProject();
    return res.status(response.code).json({mesaage: response.message, success: response.success, data: response.data})
}

const deleteProject = async(req, res)=>{
    const {projectId} = req.params;
    if(!projectId){
        return res.status(400).json({mesaage: "id parameter is missing", success: false, data: null})
    };
    const response = await projectService.deleteProject(projectId)
    return res.status(response.code).json({message: response.message, data : response.data, success: response.success})
}

const updateProject = async(req, res)=>{
    const projectImage = req.file;
    const {projectId} = req.params;
    const { projectTitle, projectDesc, caseStudy, order} = req.body
    if(!projectId){
        return res.status(400).json({mesaage: "id parameter is missing", success: false, data: null})
    };
    let parsedCaseStudy;

    if (caseStudy) {
        try {
            parsedCaseStudy = JSON.parse(caseStudy);
        } catch (error) {
            return res.status(400).json({
                message: "Invalid case study JSON",
                success: false,
                data: null
            });
        }
    }


    const response = await projectService.updateProject({projectId, projectTitle, projectDesc, caseStudy: parsedCaseStudy, projectImage, order})
    
    return res.status(response.code).json({message:response.message, data : response.data, success: response.success})
}


module.exports = {
    addProject,
    getProject,
    getAllProject,
    deleteProject,
    updateProject
}