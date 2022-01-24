const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please name your blog"]
    },
    blogImg: {
        type: String,
    },
    keywords: {
        type: String,
    },
    blogId: {
        type: String,
        required: [true]
    }
});