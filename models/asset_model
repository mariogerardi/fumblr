const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
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
    link: {
        type: String
    }}, {timestamps:true}
);

const Asset = mongoose.model('Asset', assetSchema);
module.exports = Asset; 