const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please name your blog"]
    },
    blogImg: {
        type: String,
    },
    keywords: [{
        type: String,
    }],
    user: {
        type: mongoose.Types.ObjectId,
        required: [true, "We need to know which account is posting"],
        ref: "User"
    },    
    content: [{
        type: mongoose.Types.ObjectId,
        // required: [true, "We need to know where this is posting"],
        ref: "Content"
    }]
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;