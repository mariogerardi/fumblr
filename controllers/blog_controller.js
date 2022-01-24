const express = require('express');
const router = express.Router();
const { Blog } = require('../models')

router.get('/', (req, res) => {
    
    Blog.find({}, (error, foundBlogs) => {
        if(error) return console.log(error);

        console.log(foundBlogs)
        context = {
            blogs: foundBlogs
        }
        res.render('index.ejs', context);
    })
});

router.get("/dashboard", (req, res) => {
    res.render("dashboard.ejs")
});

module.exports = router;
