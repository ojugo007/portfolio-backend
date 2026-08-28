const testimonialService = require("../service/testimonial.service")


const addTestimonial = async(req, res)=>{
    const avatar = req.file;
    const { fullName, position, testimonial, rating } = req.body;
    
    if (!avatar || !fullName || !position || !testimonial || !rating) {
        return res.status(400).json({
            message: "all fields are required",
            data: null,
            success: false
        });
    }
    const response = await testimonialService.addTestimonial({ avatar, fullName, position, testimonial, rating })
    return res.status(response.code).json({message:response.message, data:response.data, success:response.success})
}

const getAllTestimonial = async(req, res)=>{
    const response = await testimonialService.getAllTestimonial()
    return res.status(response.code).json({message:response.message, data:response.data, success:response.success})
}

const getTestimonial = async(req, res)=>{
    const {testimonialId}= req.params
    if(!testimonialId){
        return res.status(400).json({message: "id parameter missing", data : null, success : false})
    }

    const response = await testimonialService.getTestimonial(testimonialId)
    return res.status(response.code).json({message : response.message, data: response.data, success: response.success})
}

const updateTestimonial = async(req,res)=>{
    const {testimonialId} = req.params;
    const avatar = req.file;
    const { fullName, position, testimonial, rating } = req.body;

    const response = await testimonialService.updateTestimonial({avatar, testimonialId, fullName, position, testimonial, rating})
    return res.status(response.code).json({message : response.message, data: response.data, success: response.success})
}

const deleteTestimonial = async(req,res)=>{
    const {testimonialId}= req.params
    if(!testimonialId){
        return res.status(400).json({message: "id parameter missing", data : null, success : false})
    }
    const response = await testimonialService.deleteTestimonial(testimonialId)
    return res.status(response.code).json({message : response.message, data: response.data, success: response.success})
}


module.exports = {
    addTestimonial,
    getAllTestimonial,
    getTestimonial,
    updateTestimonial,
    deleteTestimonial
}
