const mongoose = require('mongoose');
const { populate } = require('./content_model');

const userSchema = new mongoose.Schema({
    typeOf: {
        type: String,
        // required: [true, "We need to know the user type"]
    },
    userName: {
        type: String,
        // required:[true],
        unique: true
    },
    firstName: {
        type: String,
        required: [true]
    },
    lastName: {
        type: String,
        required: [true]
    },
    photo: {
        type: String
    },
    password: {
        type: String,
        required: [true, "need to secure your account"]
    },
    email: {
        type: String,
        required: [true],
        unique: true,
    },
    age: {
        type: Number,
        required: [true],
    },
    gender: {
        type: String,
    },
    blog: [{
        type: mongoose.Types.ObjectId,
        // required: [true, "We need to know where this is posting"],
        ref: "blog"
    }],
    currentSession: {
        type: String,
    },
    likedContent: [{
        type: mongoose.Types.ObjectId,
    }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;