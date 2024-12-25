const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//check if user is authenticated
exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    const cookies = req.cookies;
    // console.log("COOKIES --> ", cookies);
    // console.log("TOKEN TEST IN MIDDLEWARE --> ", token);
    //Make sure that the token exists
    if (!token) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
    try {
        //Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
         // Check token expiration
         if (decoded.exp < Date.now() / 1000) {
            return next(new ErrorResponse('Token has expired, please log in again', 401));
        }
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        console.error("Token Verification Error:", error);
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
}

 //middleware for admin
 exports.isAdmin = (req, res, next) => {
    if (req.user.role === 0 || req.user.role === 2) {
        return next(new ErrorResponse('Access Denied, you must be an admin', 401));
    }
    next();
}

 //middleware for creator
 exports.isCreator = (req, res, next) => {
    if (req.user.role === 0) {
        return next(new ErrorResponse('Access Denied, you must be a jobcreator', 401));
    }
    next();
}