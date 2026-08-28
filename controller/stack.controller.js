const stackService = require("../service/stack.service")

const addStack = async(req, res)=>{
    const {technology, efficiency}= req.body
    if(!technology || !efficiency){
        return res.status(400).json({message:"all fields required", data:null, success: false})
    }
    const response = await stackService.addStack({technology, efficiency})
    return res.status(response.code).json({message:response.message, data:response.data, success: response.success})
}

const getAllStack = async(req, res)=>{
    const response = await stackService.getAllStack()
    return res.status(response.code).json({message:response.message, success:response.success, data: response.data})
}

const getStack = async(req, res)=>{
    const {stackId} = req.params
    if(!stackId){
        return res.status(400).json({message:"id parameter missing", data: null, success: false })
    }
    const response = await stackService.getStack(stackId)
    return res.status(response.code).json({message: response.message, data: response.data, success : response.success})
}

const updateStack = async(req,res)=>{
    const {stackId} = req.params
    const {technology, efficiency}= req.body
    if(!stackId){
        return res.status(400).json({message:"id parameter missing", data: null, success: false })
    }
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "at least one field is required to carry out this action",
            data: null,
            success: false
        });
    }

    const response = await stackService.updateStack({stackId, technology, efficiency});
    return res.status(response.code).json({message:response.message, data: response.data, success: response.success})
}

const deleteStack = async(req, res)=>{
    const {stackId}= req.params
    if(!stackId){
        return res.status(400).json({message:"id parameter missing", data: null, success: false })
    }
    const response = await stackService.deleteStack(stackId)
    return res.status(response.code).json({message: response.message, data: response.data, success: response.success })
}

module.exports = {
    addStack,
    getAllStack,
    getStack,
    updateStack,
    deleteStack
}