const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const blogTypeSchema = new mongoose.Schema({

    blogTypeName: {
        type: String,
        trim: true,
        required: [true, 'Blog Type is required'],
        maxLength: 70,
    },

    user: { 
        type: ObjectId,
        ref: 'User',
        required: false
    }, 
    

}, {timestamps: true})



module.exports = mongoose.model("BlogType", blogTypeSchema);