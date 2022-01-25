const express = require('express');
const router = express.Router();
const { Content } = require('../models')

router.get('/', (req, res) => {
    
    Content.find({}, (error, foundContent) => {
        if(error) return console.log(error);

        console.log(foundContent)
        const context = {content: foundContent}
        res.render('blog.ejs', context);
    })
});

router.get("/new-text-post", (req, res) => {
    res.render("new-content/new_text.ejs")
});

router.post('/', (req, res) => {
    Content.create(req.body, (error, createdContent) => {
        if(error) console.log(error);
        console.log(createdContent);
        
        
        res.redirect("/content");
    })
});

router.get("/create_post", (req, res) => {
    res.render("create_post.ejs")
});


module.exports = router;