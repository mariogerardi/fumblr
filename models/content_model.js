const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    typeOf: {
        type: String,
    },
    //relationship to blog
    blog: {
        type: mongoose.Types.ObjectId,
        // required: [true, "We need to know where this is posting"],
        ref: "Blog"
    },
    //relationship to user
    user: {
        type: mongoose.Types.ObjectId,
        // required: [true, "We need to know which account is posting"],
        ref: "User"
    },
    userName: {
        type: String
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
    author: {
        type: String
    },
    link: {
        type: String
    }, 
    notes: [{
        type: mongoose.Types.ObjectId,
    }]},{timestamps:true}
);

const Content = mongoose.model('Content', contentSchema);
module.exports = Content; 