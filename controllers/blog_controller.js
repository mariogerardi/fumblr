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


router.get('/:blogId', (req, res) => {
    
    Blog.findById(req.params.blogId, (error, foundBlog) => {
        if (error) {
            console.log(req.params)
            console.log(error);
            const context = { error: error };
            return res.status(404).render("404", context);
        }
        return res.render('show.ejs', {blog: foundBlog});
    });
    
});

module.exports = router;
