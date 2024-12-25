const blogType = require('../models/blogTypeModel')
const ErrorResponse = require('../utils/errorResponse');

//create blog category
exports.createBlogType = async (req, res, next) => {
    try {
        const blogT = await blogType.create({
            blogTypeName: req.body.blogTypeName,
            // user: req.user.id
        });
        res.status(201).json({
            success: true,
            blogT
        });
    } catch (error) {
        next(error);
    }
    }

//all blogs category
exports.allBlogsType = async (req, res, next) => {
    try {
        // const jobT = await jobType.find();
        const blogT = await blogType.find().sort({ createdAt: -1}); 
        res.status(200).json({
            success: true,
            blogT
        })
    } catch (error) {
        next(error);
    }
    }

//update blog type
exports.updateBlogType = async (req, res, next) => {
    try {
        const blogT = await blogType.findByIdAndUpdate(req.params.type_id, req.body);
        res.status(200).json({
            success: true,
            blogT
        })
    } catch (error) {
        next(error);
    }
}

//delete blog type
exports.deleteBlogType = async (req, res, next) => {
    try {
        const blogT = await blogType.findByIdAndRemove(req.params.type_id);
        res.status(200).json({
            success: true,
            message : "Blog type deleted successfully"
        })
    } catch (error) {
        next(new ErrorResponse("server error", 500));
    }
}
