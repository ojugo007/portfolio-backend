const messageService = require("../service/message.service")


const getAllMessage = async(req,res)=>{
    const response = await messageService.getAllMessage()
    return res.status(response.code).json({message:response.message, data: response.data, success: response.success})
}

const getMessage = async(req,res)=>{
    const {messageId}=req.params
    if(!messageId){
        return res.status(400).json({message:"id parameter missing", data:null, success:false})
    }
    const response = await messageService.getMessage(messageId)
    return res.status(response.code).json({message:response.message, data:response.data, success:response.success})
}

const sendMessage = async(req, res)=>{
    const {name, email, message} = req.body;

    if(!name || !email || !message){
        return res.status(400).json({message:"cannot send message with empty field", data: null, success: false})
    }

    const response = await messageService.sendMessage({name, email, message})
    return res.status(response.code).json({message: response.message, data: response.data, success: response.success})
}

// reply message
const generateMessage = async(req,res)=>{
    const{messageId} = req.params;
    if(!messageId){
        return res.status(400).json({message:"id missing in ai-reply parameter", data: null, success: false})
    }
    const response = await messageService.generateMessage(messageId)
    return res.status(response.code).json({message:response.message, data:response.data, success:response.success})

}

const sendResponse = async(req, res)=>{
    const {messageId} = req.params;
    const {message} = req.body;
    if(!messageId){
        return res.status(400).json({message:"message id missing",success : false, data: null})
    }
    if(!message){
        return res.status(400).json({message:"all fields are required",success : false, data: null})
    }
    const response = await messageService.sendResponse({messageId, message})
    return res.status(response.code).json({message:response.message, data:response.data, success:response.success})
}

const deleteMessage = async(req,res)=>{
    const {messageId} = req.params
    if(!messageId){
        return res.status(400).json({message:"message id missing in delete route",success : false, data: null})
    }
    response = await messageService.deleteMessage(messageId)
    return res.status(response.code).json({message:response.message, success:response.success, data:response.data })
}

module.exports = {
    sendMessage,
    getAllMessage,
    getMessage,
    generateMessage,
    sendResponse,
    deleteMessage
}














































