const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    message:{type: String, required: true, trim: true},
    status:{type:String, enum:["read", "not read"], default:"not read"},
    replied: {
        type: Boolean,
        default: false
    },
    repliedAt: {
        type: Date,
        default: null
    }
    
},{timestamps:true})

const MessageModel = mongoose.model("message", MessageSchema)
module.exports = MessageModel