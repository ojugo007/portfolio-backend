const mongoose = require("mongoose")

const ServicesSchema = new mongoose.Schema({
    serviceType : {type : String, required : true, trim : true},
    description : {type : String, required : true}
},{timestamps: true})

ServicesSchema.index({ serviceType: 1 }, { unique: true, collation: { locale: "en", strength: 2 } })

const ServicesModel = mongoose.model("services", ServicesSchema)
module.exports = ServicesModel