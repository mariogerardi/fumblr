const express = require('express');
const res = require('express/lib/response');
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
        const foundUser = await User.find({currentSession: req.sessionID})
        if (!foundUser) return res.redirect('/user/login')
        console.log("Hey hey, The user is: " + foundUser)
        const foundBlogs = await Blog.find({});
        const foundBlog = await Blog.findOne({_id: foundUser[0].blog})
        console.log("Hey hey, found the blog, its: " + foundBlog)
        const context = { 
            content: foundContent,
            allUsers: foundUsers,
            currentUser: foundUser,
            allBlogs: foundBlogs,
            currentBlog: foundBlog
        }
        // console.log(context)
        // console.log('Im testing foundUser:' + " " + foundUser)
        res.render('dashboard.ejs', context)
    } catch (err) {
        console.log(err);
        res.send(err);
        return next();
    }
})


// router.get('/:blogId', (req, res) => {
    
//     Blog.findById(req.params.blogId, (error, foundBlog) => {
//         if (error) {
//             console.log(req.params)
//             console.log(error);
//             const context = { error: error };
//             return res.status(404).render("404", context);
//         }
//         return res.render('show.ejs', {blog: foundBlog});
//     });
    
// });

router.get('/:blogId', async (req, res, next) => {
    try {
        const foundBlog = await Blog.findById({_id:req.params.blogId})
        console.log(foundBlog)
        if (!foundBlog) return res.send('Oh, no.. I cant find the blog 😨');
        // const foundContent = await Blog.content.find({})
        // if (!foundContent) return res.send('uh...no content  ಥ _ ಥ  ')
        const context = {
            blog: foundBlog
        }
        res.render('blog.ejs', context )
    } catch(err) {
        console.log(err);
        return res.send(err);
    }
})

module.exports = router;
