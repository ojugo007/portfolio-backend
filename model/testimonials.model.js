const mongoose = require("mongoose")

const TestimonialSchema = new mongoose.Schema({
    fullName: {type: String, required: true, trim: true},
    position: {type: String, required: true, trim: true},
    testimonial:{type: String, required: true, trim: true},
    rating: {type: Number, required: true , min: 1 , max: 5},
    avatar:{type: String, required: true, trim: true}
},{timestamps:true})

const TestimonialModel = mongoose.model("testimonial", TestimonialSchema)
module.exports = TestimonialModel


    