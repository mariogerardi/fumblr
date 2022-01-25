const express = require('express');
const router = express.Router();
const { Content } = require('../models')

router.get("/content", (req, res) => {
    res.send("I am a route now")
});


router.get("/create_post", (req, res) => {
    res.render("create_post.ejs")
});

router.get("/new-text-post", (req, res) => {
    res.render("new-content/new_text.ejs")
});

module.exports = router;