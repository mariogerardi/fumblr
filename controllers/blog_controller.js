const express = require('express');
const router = express.Router();
const { Blog, Content, User } = require('../models');

router.get('/', (req, res) => {
    res.render('index.ejs');
    });


// router.get("/dashboard", (req, res) => {
//     Content.find({}, (error, foundContent) => {
//         if(error) return console.log(error);
//         console.log(foundContent)
//         const context = {content: foundContent}
//         res.render('dashboard.ejs', context);
//     })
// });

// router.get('/dashboard', (req, res) => {
//     Content.find({}, (error, foundContent) => {
//         if(error) {
//             console.log(error)
//             req.error = error;
//             return next();
//         }
//     User.find({}, (error, foundUsers) => {
//         console.log(error)
//         const context = {
//             content: foundContent,
//             user: foundUsers
//         };
//         return res.render('dashboard.ejs', context)
//     })
//     })
// })

router.get('/dashboard', async function (req, res, next) {
    try {
        const foundContent = await Content.find({})
        if (!foundContent) return res.send('Cant find content!')
        const foundUsers = await User.find({})
        const context = { 
            content: foundContent,
            user: foundUsers
        }
        res.render('dashboard.ejs', context)
    } catch (err) {
        console.log(err);
        res.send(err);
        return next();
    }
})

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
