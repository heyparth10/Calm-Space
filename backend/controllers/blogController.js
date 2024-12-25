const Blog = require('../models/blogModel')
const BlogType = require('../models/blogTypeModel')
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/userModel')

//create blog
exports.createBlog = async (req, res, next) => {
    const { title, description, image, user, blogType, location} = req.body;
    try {
        const blog = await Blog.create({
            company: req.body.company,
            title: req.body.title,
            description: req.body.description,
            image : req.body.image,
            blogType: req.body.blogType,
            location : req.body.location,
            user: req.body.user
        });
        // console.log(req.user._id);
        const currentUser = await User.findOne({_id: req.body.user});
        // console.log(currentUser);
        if (!currentUser) {
            return next(new ErrorResponse("You need to Log In", 401));
        } else {
            const addBlogCreatorHistory = {
                title, 
                description,
                image,
                blogType,
                location,
                // user: req.user._id
                user: user
            }
            currentUser.blogCreatorHistory.push(addBlogCreatorHistory);
            await currentUser.save();
        }
        res.status(201).json({
            success: true,
            blog
        });
    } catch (error) {
        next(error);
    }
    }

//singleBlog 
exports.singleBlog = async (req, res, next) => {
    // try {
    //     const job = await Job.findById(req.params.id).populate('jobType', 'jobTypeName');
    //     console.log("backend job", job);
    //     res.status(200).json({
    //         success: true,
    //         job
    //     });
    // } catch (error) {
    //     next(error);
    // }
    try {
        const userId = req.user._id;
        const blogId = req.params.id;
        console.log("userId" , userId);
        console.log("blogId" , blogId);
        const user = await User.findById(userId);
        const blogs = user.blogCreatorHistory;
        let singleBlog = blogs.find(blog => blog._id == blogId);
        const blog = await Blog.findById(req.params.id).populate('blogType', 'blogTypeName');

        console.log("singleweBlog", singleBlog);
        if (singleBlog === undefined) {
        res.status(200).json({
            success: true,
            blog 
        });
    } else {
        res.status(200).json({
            success: true,
            blog : singleBlog
        });
    }
    } catch (error) {
        next(error);
    }
}

//update blog by id 
exports.updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.blog_id, req.body, {new: true}).populate('blogType', 'blogTypeName').populate('user', 'firstName lastName'); //new: true returns the updated blog
        res.status(200).json({
            success: true,
            blog
        });
    } catch (error) {
        next(error);
    }
    }

//show blogs
exports.showBlogs = async (req, res, next) => {
    console.log("Testing")
    //enable search
    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: 'i' //case insensitive
        }
        } : {}

        // console.log("keyword--------------------------------------------------->", keyword)

        //filter blogs by category ids
        let ids =[];
        const blogTypeCategory = await BlogType.find({}); //_id means we want to have only ids
        // console.log("blogTypeCategory--------------------------------------------------->", blogTypeCategory)
        blogTypeCategory.forEach(cat => {
            ids.push(cat._id);
        })

        let cat = req.query.cat; //category id
        let categ = cat !== '' ? cat : ids; //if category id is not empty, then use it, otherwise use all ids

        //blogs by location
        let locations = [];
        const blogByLocation = await Blog.find({}, {location:1});
        blogByLocation.forEach(val => {
            locations.push(val.location);
        });
        let setUniqueLocation = [...new Set(locations)]; //remove duplicate locations 
                                                          //...new Set() means we want to have an array 
                                                          //Set() is a collection of unique values
        let location = req.query.location; //location
        let locationFilter = location !== '' ? location : setUniqueLocation; //if location is not empty, then use it, otherwise use all locations


    //enable pagination
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    // const count = await Blog.find({}).estimatedDocumentCount();
    const count = await Blog.find({...keyword, blogType : categ, location : locationFilter}).countDocuments(); //...keyword means if keyword is not empty, then use it, otherwise use all jobs //jobType : categ means if categ is not empty, then use it, otherwise use all jobs

    try {
        const blogs = await Blog.find({...keyword, blogType : categ, location : locationFilter}).sort({ createdAt : -1}).populate('blogType', 'blogTypeName').populate('user', 'firstName').skip(pageSize * (page - 1)).limit(pageSize)
        console.log(blogs);
        res.status(200).json({
            success: true,
            blogs,
            page,
            pages: Math.ceil(count / pageSize), //Math.ceil() rounds up the number of pages
            count,
            setUniqueLocation
        });
    } catch (error) {
        next(error);
    }
    }

    //delete all blogs and remove after doing that
    exports.deleteAllBlogs = async (req, res, next) => {
        try {
            const response = await Blog.deleteMany();
            res.status(200).json({
                success: true,
                message: "All blogs have been deleted",
                deletedBlogs: response
            });
        } catch (error) {
            next(error);
        }
    }

    //delete blog type
exports.deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndRemove(req.params.blog_id);
        res.status(200).json({
            success: true,
            message : "Blog deleted successfully"
        })
    } catch (error) {
        next(new ErrorResponse("server error", 500));
    }
}
