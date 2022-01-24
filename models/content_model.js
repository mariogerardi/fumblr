const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    typeof: {
        type: String,
    },
    blogId: {
        type: Number,
        required: [true, "We need to know where this is posting"]
    },
    userId: {
        type: Number,
        required: [true, "We need to know which account is posting"]
    },
    title: {
        type: String
    },
    text: {
        type: String
    },
    photo: {
        type: String
    },
    video: {
        type: String
    },
    audio: {
        type: String
    },
    chat: {
        type: String
    },
    quote: {
        type: String
    },
    link: {
        type: String
    }
})