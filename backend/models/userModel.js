//check bycrypt documentation

const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//videoProgressSchema for user
const videoProgressSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});

//jobHistorySchema for user
const blogHistorySchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        maxLength: 70,
    },

    description: {
        type: String,
        trim: true,
    },

    image: {
        type: String,
        trim: true,
    },

    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    }, 
    

}, {timestamps: true})

//jobCreationHistorySchema for creator
const blogCreationHistorySchema = new mongoose.Schema({

    
    title: {
        type: String,
        trim: true,
        maxLength: 70,
    },

    description: {
        type: String,
        trim: true,
    },

    image: {
        type: String,
        trim: true,
    },

    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    }, 

}, {timestamps: true})


const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        trim: true,
        required: [true, 'first name is required'],
        maxLength: 32,
    }, 
    lastName: {
        type: String,
        trim: true,
        required: [true, 'last name is required'],
        maxLength: 32,
    }, 
    email: {
        type: String,
        trim: true,
        required: [true, 'email is required'],
        maxLength: 32,
        unique: true,
    }, 
    password: {
        type: String,
        trim: true,
        required: [true, 'password is required'],
        minLength: [6, 'password must be at least 6 characters'],
    }, 
    videoHistory: [videoProgressSchema],

    blogHistory : [blogHistorySchema],
    blogCreatorHistory : [blogCreationHistorySchema],

    role: {
        type: Number,
        default: 0,
        required : [true, 'role is required'],
    },

    gender: {
        type: String,
        default: "Male",
        required : [true, 'gender is required'],
    },

    age: {
        type: Number,
        default: 18,
        required: [true, 'age is required. user must be 18 years or above'],
    },

}, {timestamps: true})

//encrypt password before saving
userSchema.pre('save', async function(next){
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

//compare user password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

//return a JWT token 
userSchema.methods.getJwtToken = function () {
    return jwt.sign({id : this.id}, process.env.JWT_SECRET, {
        expiresIn: 3600
    }); //this is our payload
}

module.exports = mongoose.model("User", userSchema);