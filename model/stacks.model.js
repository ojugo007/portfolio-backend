const mongoose = require('mongoose')

const StacksSchema = new mongoose.Schema({
    technology : {
        type : String,
        required : true,
        trim: true,
    },
    efficiency : {
        type : Number,
        required: true,
        min: 0,
        max: 100,
    }

}, { timestamps: true })

StacksSchema.index({ technology: 1 }, { unique: true, collation: { locale: "en", strength: 2 } })
const StacksModel = mongoose.model("stacks", StacksSchema)

module.exports = StacksModel