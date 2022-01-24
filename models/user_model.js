const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    typeOf: {
        type: String,
        required: [true, "We need to know the user type"]
    },
    firstName: {
        type: String,
        required: [true]
    },
    lastName: {
        type: String,
        required: [true]
    },
    password: {
        type: String,
        required: [true, "need to secure your account"]
    },
    email: {
        type: String,
        required: [true]
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
    }
});