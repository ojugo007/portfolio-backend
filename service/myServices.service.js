const ServicesModel = require("../model/services.model")


const addService = async({serviceType, description})=>{
    const service = await ServicesModel.create({serviceType, description})
    return {
        message: "Service saved successfully",
        data: service,
        success: true,
        code: 201
    };
}

const getAllService = async()=>{
    const services = await ServicesModel.find()
    if(services.length === 0){
        return{
            message : "no service available at the moment",
            code: 200,
            data: [],
            success: true
        }
    }
    return{
        message : "service retrieved successfully",
        code: 200,
        data: services,
        success: true
    }
}

const getService = async(serviceId)=>{
    const service = await ServicesModel.findById(serviceId)
    if(!service){
        return{
            message : "service record with the id not found",
            code : 404,
            success: false,
            data: null
        }
    }
    return {
        message:"service record retrieved successfully",
        code : 200,
        success : true,
        data: service
    }
}

const updateService = async({serviceId, serviceType, description})=>{
    const service = await ServicesModel.findById(serviceId)
    if(!service){
        return{
            message:"service with id not found",
            code : 404,
            data : null,
            success : false
        }
    }

    if(serviceType !== undefined){
        service.serviceType = serviceType
    }
    if(description !== undefined){
        service.description = description
    }

    await service.save()
    return {
        message : "service successfully updated",
        code : 200,
        success: true,
        data: service
    }
}

const deleteService = async(serviceId)=>{
    const service = await ServicesModel.findByIdAndDelete(serviceId)
    if(!service){
        return{
            message:"service with id not found",
            code : 404,
            data : null,
            success : false
        }
    }

    return {
        message:"service successfully deleted",
        code : 200,
        data : null,
        success : true
    }
}


module.exports = {
    addService,
    getAllService,
    getService,
    deleteService,
    updateService
}