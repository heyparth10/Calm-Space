const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');

//load all users
exports.allUsers = async (req, res, next) => { 
    //enable pagination 
    const pageSize = 10; //10 users per page
    const page = Number(req.query.pageNumber) || 1; //if no page number, default to 1
    const count = await User.find({}).estimatedDocumentCount(); //count everything in the doc

    try {
        const users = await User.find().sort({ createdAt: -1}).select('-password') //sort by most recent //don't return password
        .skip(pageSize * (page - 1)) //skip the first 10 users
        .limit(pageSize); //limit to 10 users per page
        res.status(200).json({ 
            success: true, 
            users,
            page,
            pages : Math.ceil(count / pageSize),
            count
        })
        next();
    } catch (err) {
        next(err);
    }
}

// show single user
exports.singleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); //don't return password
        res.status(200).json({ 
            success: true, 
            user 
        });
        next();
    } catch (err) {
        next(err);
    }
}

// edit user
exports.editUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true}); //new: true returns the updated user
        res.status(200).json({ 
            success: true, 
            user 
        });
        next();
    } catch (err) {
        next(err);
    }
}


// delete user
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id); //delete user
        res.status(200).json({ 
            success: true, 
            message : 'User deleted'
        });
        next();
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}


//blogs history 
exports.createUserBlogHistory = async (req, res, next) => {
    const {title, description, image, creatorId} = req.body;
    console.log(creatorId);
    try {
        const currentUser = await User.findOne({_id: req.user.id});
        if (!currentUser) {
            return next(new ErrorResponse("You need to Log In", 401));
        } else {
            const addBlogHistory = {
                title, 
                description,
                image,
                user: creatorId
            }
            currentUser.blogHistory.push(addBlogHistory);
            await currentUser.save();
        }
        res.status(200).json({
            success: true,
            currentUser
        })
    } catch (error) {
        next(error);
    }
    }

// jobs creation history 
exports.createCreatorBlogHistory = async (req, res, next) => {
    const {title, description, image} = req.body;

    try {
        const currentUser = await User.findOne({_id: req.user.id});
        if (!currentUser) {
            return next(new ErrorResponse("You need to Log In", 401));
        } else {
            const addBlogCreatorHistory = {
                title, 
                description,
                image,
                user: req.user._id
            }
            currentUser.blogCreatorHistory.push(addBlogCreatorHistory);
            await currentUser.save();
        }
        res.status(200).json({
            success: true,
            currentUser
        })
    } catch (error) {
        next(error);
    }
    }

//The creator gets the Applicant Info
exports.getApplicantInfo = async (req, res, next) => {

    try {
        
        const creatorId = req.user.id;
        console.log("creatorId --> ");
        console.log(creatorId);

        const response = await User.find({
           blogHistory:{
            // $in:{
            //     user:creatorId
            // }
                $elemMatch: { //this is the query for nested objects
                    'user': creatorId 
                }
           } 
        })
        console.log(response);

        res.status(200).json({
            success: true,
            allApplicants: response
        })
    } catch (error) {
        next(error);
    }
}


//The creator can change the blog status of the applicant
exports.changeStatus = async (req, res, next) => {

    try {
        
        // const creatorId = req.user.id;
        // console.log("creatorId --> ");
        // console.log(creatorId);

        const {blogHistoryId, userId, newStatus} = req.body;
        const userData = await User.findOne({_id: userId});
        const blogHistoryArray = userData.jobHistory;

         // Find the index of the jobHistory object with the specified jobHistoryId
         const blogHistoryIndex = blogHistoryArray.findIndex(
            (blog) => blog._id.toString() === blogHistoryId
        );

         // If the jobHistory object is found
         if (blogHistoryIndex !== -1) {
            // Update the applicationStatus of the specified jobHistory object
            blogHistoryArray[blogHistoryIndex].applicationStatus = newStatus;

            // Save the updated userData
            await userData.save();

            res.status(200).json({
                success: true,
                message: 'Application status updated successfully',
                updatedBlogHistory: blogHistoryArray[blogHistoryIndex],
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Blog history not found',
            });
        }
        
    } catch (error) {
        next(error);
    }
}

//delete all users in one go and remove this func later
exports.deleteAllUsers = async (req, res, next) => {
    try {
        const resoponse = await User.deleteMany();
        res.status(200).json({ 
            success: true, 
            message : 'All users deleted',
            deletedUsers : resoponse
        });
        next();
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// Update video progress
exports.updateVideoProgress = async (req, res) => {
    const videoUrl = req.body.url;
    const userId = req.body.userId;
    console.log(req.body);
    console.log(videoUrl);
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const videoIndex = user.videoHistory.findIndex(video => video.url === videoUrl);
        if (videoIndex === -1) {
            // Video not found in history, add it
            user.videoHistory.push({ url: videoUrl, isCompleted: true });
        } else {
            // Video found, update completion status
            user.videoHistory[videoIndex].isCompleted = true;
        }
        await user.save();
        res.status(200).json({ message: "Video progress updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};