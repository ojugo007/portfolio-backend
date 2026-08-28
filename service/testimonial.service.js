const TestimonialModel = require("../model/testimonials.model")
const cloudinary = require("../integration/cloudinary")
const fs = require("fs")
const path = require("path")

const addTestimonial = async ({ avatar, fullName, position, testimonial, rating }) => {
    let avatarUrl;

    if (avatar?.path) {
        const publicId = `avatar-image/${fullName}-${Date.now()}`;
        const uploadResult = await cloudinary.uploader.upload(avatar.path, { public_id: publicId })

        avatarUrl = cloudinary.url(uploadResult.public_id, {
            crop: "auto",
            gravity: "auto",
            width: 500,
            height: 500
        });

        try {
            await fs.unlink(path.normalize(avatar.path))
            console.log("successfully deleted file")
        } catch (error) {
            console.log("unable to delete file")
        }

        const testimonialRecord = await TestimonialModel.create({
            avatar: avatarUrl,
            fullName,
            position,
            testimonial,
            rating
        })
        return {
            message: "testimonial record successfully added",
            data: testimonialRecord,
            success: true,
            code: 201
        }
    }
}

const getAllTestimonial = async () => {
    const testimonials = await TestimonialModel.find()
    if (testimonials.length === 0) {
        return {
            message: "no testimonial available at the moment",
            code: 200,
            data: [],
            success: true
        }
    }
    return {
        message: "testimonial records successfully retrieved",
        code: 200,
        data: testimonials,
        success: true
    }
}

const getTestimonial = async (testimonialId) => {
    const testimonialRecord = await TestimonialModel.findById(testimonialId)
    if (!testimonialRecord) {
        return {
            message: "testimonial with the id not found",
            code: 404,
            data: null,
            success: false
        }
    }
    return {
        message: "testimonial record successfully retrieved",
        code: 200,
        data: testimonial,
        success: true
    }
}

const updateTestimonial = async ({testimonialId, avatar, fullName, position, testimonial, rating }) => {
    const testimonialRecord = await TestimonialModel.findById(testimonialId);

    if (!testimonialRecord) {
        return {
            message: "testimonial not found for update",
            data: null,
            success: false,
            code: 404
        };
    }

    if(fullName !== undefined){
        testimonialRecord.fullName = fullName
    }
    if(position !== undefined){
        testimonialRecord.position = position
    }
    if(testimonial !== undefined){
        testimonialRecord.testimonial = testimonial
    }
    if(rating !== undefined){
        testimonialRecord.rating = rating
    }

    if (avatar?.path) {
        const publicId = `avatar-image/${testimonialRecord.fullName}-${Date.now()}`;

        const uploadResult = await cloudinary.uploader.upload(
            avatar.path,
            {
                public_id: publicId
            }
        );

        const autoCropUrl = cloudinary.url(uploadResult.public_id, {
            crop: "auto",
            gravity: "auto",
            width: 500,
            height: 500
        });

        testimonialRecord.avatar = autoCropUrl;

        try {
            await fs.unlink(path.normalize(avatar.path));
            console.log("successfully deleted temporary file");
        } catch (error) {
            console.log("unable to delete temporary file");
        }
    }
    return{
        message: "testimonial record successfully updated",
        code: 200,
        data: testimonialRecord,
        success: true
    }
}

const deleteTestimonial = async (testimonialId) => {
    const testimonialRecord = await TestimonialModel.findByIdAndDelete(testimonialId)
    if (!testimonialRecord) {
        return {
            message: "testimonial with the id not found",
            code: 404,
            data: null,
            success: false
        }
    }
    return {
        message: "testimonial record successfully deleted",
        code: 200,
        data: null,
        success: true
    }
}


module.exports = {
    addTestimonial,
    getAllTestimonial,
    getTestimonial,
    updateTestimonial,
    deleteTestimonial
}