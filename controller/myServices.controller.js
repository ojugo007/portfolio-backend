const myServicesService = require("../service/myServices.service")

const addService = async(req, res)=>{
    const {serviceType, description}= req.body
    if(!serviceType || !description){
        return res.status(400).json({message:"all fields required", data:null, success: false})
    }
    const response = await myServicesService.addService({serviceType, description})
    return res.status(response.code).json({message:response.message, data:response.data, success: response.success})
}

const getAllService = async(req, res)=>{
    const response = await myServicesService.getAllService()
    return res.status(response.code).json({message:response.message, success:response.success, data: response.data})
}

const getService = async(req, res)=>{
    const {serviceId} = req.params
    if(!serviceId){
        return res.status(400).json({message:"id parameter missing", data: null, success: false })
    }
    const response = await myServicesService.getService(serviceId)
    return res.status(response.code).json({message: response.message, data: response.data, success : response.success})
}

const updateService = async(req,res)=>{
    const {serviceId} = req.params
    const {serviceType, description}= req.body
    if(!serviceId){
        return res.status(400).json({message:"id parameter missing", data: null, success: false })
    }
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "at least one field is required to carry out this action",
            data: null,
            success: false
        });
    }

    const response = await myServicesService.updateService({serviceId, serviceType, description});
    return res.status(response.code).json({message:response.message, data: response.data, success: response.success})
}

const deleteService = async(req, res)=>{
    const {serviceId}= req.params
    if(!serviceId){
        return res.status(400).json({message:"id parameter missing", data: null, success: false })
    }
    const response = await myServicesService.deleteService(serviceId)
    return res.status(response.code).json({message: response.message, data: response.data, success: response.success })
}

module.exports = {
    addService,
    getAllService,
    getService,
    updateService,
    deleteService
}