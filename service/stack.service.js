const StacksModel = require("../model/stacks.model");

const addStack = async({technology, efficiency})=>{
    const stack = await StacksModel.create({technology, efficiency})
    return {
        message: "stack created successfully",
        data: stack,
        success: true,
        code: 201
    };
}

const getAllStack = async()=>{
    const stacks = await StacksModel.find()
    if(stacks.length === 0){
        return{
            message : "no stack available at the moment",
            code: 200,
            data: [],
            success: true
        }
    }
    return{
        message : "stack retrieved successfully",
        code: 200,
        data: stacks,
        success: true
    }
}

const getStack = async(stackId)=>{
    const stack = await StacksModel.findById(stackId)
    if(!stack){
        return{
            message : "stack record with the id not found",
            code : 404,
            success: false,
            data: null
        }
    }
    return {
        message:"stack record retrieved successfully",
        code : 200,
        success : true,
        data: stack
    }
}

const updateStack = async({stackId, technology, efficiency})=>{
    const stack = await StacksModel.findById(stackId)
    if(!stack){
        return{
            message:"stack with id not found",
            code : 404,
            data : null,
            success : false
        }
    }

    if(technology !== undefined){
        stack.technology = technology
    }
    if(efficiency !== undefined){
        stack.efficiency = efficiency
    }

    await stack.save()
    return {
        message : "stack successfully updated",
        code : 200,
        success: true,
        data: stack
    }
}

const deleteStack = async(stackId)=>{
    const stack = await StacksModel.findByIdAndDelete(stackId)
    if(!stack){
        return{
            message:"stack with id not found",
            code : 404,
            data : null,
            success : false
        }
    }

    return {
        message:"stack successfully deleted",
        code : 200,
        data : null,
        success : true
    }
}


module.exports = {
    addStack,
    getAllStack,
    getStack,
    updateStack,
    deleteStack
}