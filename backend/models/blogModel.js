const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const blogSchema = new mongoose.Schema({

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

    location: {
        type: String,
    },

    blogType: {
        type: ObjectId,
        ref: "BlogType",
        required: true,
    },

    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    }, 
    

}, {timestamps: true})



module.exports = mongoose.model("Blog", blogSchema);