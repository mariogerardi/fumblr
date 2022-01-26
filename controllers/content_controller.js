const express = require('express');
const router = express.Router();
const { Content } = require('../models')

router.get('/', (req, res) => {
    
    Content.find({}, (error, foundContent) => {
        if(error) return console.log(error);

        console.log(foundContent)
        const context = {content: foundContent}
        res.render('dashboard.ejs', context);
    })
});

router.get("/new-text-post", (req, res) => {
    res.render("new-content/new_text.ejs")
});

router.get("/new-image-post", (req, res) => {
    res.render("new-content/new_image.ejs")
});

router.post('/', (req, res) => {
    Content.create(req.body, (error, createdContent) => {
        if(error) console.log(error);
        console.log(createdContent);
        
        
        res.redirect("/fumblr/dashboard");
    })
});

router.get("/create_post", (req, res) => {
    res.render("create_post.ejs")
});


module.exports = router;