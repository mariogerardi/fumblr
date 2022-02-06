const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const { Content, User, Blog } = require('../models')

router.get("/new/:postType", async (req, res) => {
    try {
        const foundUser = await User.find({currentSession: req.sessionID})
        const foundBlog = await Blog.findOne({_id: foundUser[0].blog})
        let test_text = false
        let test_image = false
        let test_quote = false
        let test_link = false
        let test_chat = false
        let test_audio = false
        let test_video = false
        if (req.params.postType === "text-post") {
            test_text = true
        }
        if (req.params.postType === "image-post") {
            test_image = true
        }
        if (req.params.postType === "quote-post") {
            test_quote = true
        }
        if (req.params.postType === "link-post") {
            test_link = true
        }
        if (req.params.postType === "chat-post") {
            test_chat = true
        }
        if (req.params.postType === "audio-post") {
            test_audio = true
        }
        if (req.params.postType === "video-post") {
            test_video = true
        }
        const context = {
            currentUser: foundUser,
            currentBlog: foundBlog,
            text: test_text,
            image: test_image,
            quote: test_quote,
            link: test_link,
            chat: test_chat,
            audio: test_audio,
            video: test_video,
        }
        res.render('new_post.ejs', context)
    } catch {
        const context = { error: req.error };
        return res.status(404).render("404", context);
    }
});

// router.get("/new-text-post", async (req, res) => {
//     try {
//         const foundUser = await User.find({ currentSession: req.sessionID })
//         const context = {
//             currentUser: foundUser
//         }
//         res.render("new-content/new_text.ejs", context)
//     } catch (err) {
//         console.log(err)
//         return res.send(err)
//     }
// });

// router.get("/new-image-post", async (req, res) => {
//     try {
//         const foundUser = await User.find({ currentSession: req.sessionID })
//         const context = {
//             currentUser: foundUser,
//             image: true
//         }
//         res.render("new-content/new_image.ejs", context)
//     } catch (err) {
//         console.log(err)
//         return res.send(err)
//     }
// });

// router.get("/new-quote-post", async (req, res) => {
//     try {
//         const foundUser = await User.find({ currentSession: req.sessionID })
//         const context = {
//             currentUser: foundUser,
//             quote: true
//         }
//         res.render("new-content/new_quote.ejs", context)
//     } catch (err) {
//         console.log(err)
//         return res.send(err)
//     }
// });

// router.get("/new-link-post", async (req, res) => {
//     try {
//         const foundUser = await User.find({ currentSession: req.sessionID })
//         const context = {
//             currentUser: foundUser,
//             link: true
//         }
//         res.render("new-content/new_link.ejs", context)
//     } catch (err) {
//         console.log(err)
//         return res.send(err)
//     }
// });

// router.get("/new-chat-post", async (req, res) => {
//     try {
//         const foundUser = await User.find({ currentSession: req.sessionID })
//         const context = {
//             currentUser: foundUser,
//             chat: true
//         }
//         res.render("new-content/new_chat.ejs", context)
//     } catch (err) {
//         console.log(err)
//         return res.send(err)
//     }
// });

// router.get("/new-audio-post", async (req, res) => {
//     try {
//         const foundUser = await User.find({ currentSession: req.sessionID })
//         const context = {
//             currentUser: foundUser,
//             audio: true
//         }
//         res.render("new-content/new_audio.ejs", context)
//     } catch (err) {
//         console.log(err)
//         return res.send(err)
//     }
// });

// router.get("/new-video-post", async (req, res) => {
//     try {
//         const foundUser = await User.find({ currentSession: req.sessionID })
//         const context = {
//             currentUser: foundUser,
//             video: true
//         }
//         res.render("new-content/new_video.ejs", context)
//     } catch (err) {
//         console.log(err)
//         return res.send(err)
//     }
// });

// router.post('/', (req, res) => {
//     Content.create(req.body, (error, createdContent) => {
//         if(error) console.log(error);
//         console.log(createdContent);


//         res.redirect("/fumblr/dashboard");
//     })
// });


router.post('/', async function (req, res) {
    try {
        const createdContent = await Content.create(req.body)
        if (!createdContent) return res.send('No Content being created (ﾉ*ФωФ)ﾉ)')
        console.log(createdContent)
        res.redirect('/dashboard')
    } catch (err) {
        console.log(err);
        return res.send('No Content being created (ﾉ*ФωФ)ﾉ) ' + err);
    }
})

// router.get('/:contentId', (req, res) => {

//     Content.findById(req.params.contentId, (error, foundContent) => {
//         if (error) {
//             console.log(req.params)
//             console.log(error);
//             const context = { error: error };
//             return res.status(404).render("404", context);
//         }
//         res.render('show.ejs', {content: foundContent});
//     });

// });

router.get('/:contentId', async function (req, res) {
    try {
        const foundContent = await Content.findOne(req.params._id)
        if (!foundContent) return res.send('No content found !!! ผ(•̀_•́ผ)')
        console.log(foundContent)
        res.render('show.ejs', foundContent)
    } catch (err) {
        console.log(err);
        return res.send(err);
    }
});


// router.delete('/:contentId', (req, res) => {
//     Content.findByIdAndDelete(req.params.contentId, (error, deleteContent) => {
//         if(error) {
//             console.log(error);
//             res.send(error);
//         }

//         console.log(deleteContent);
//         res.redirect("/fumblr/dashboard");
//     })
// });

router.delete('/:contentId', async (req, res, next) => {
    try {
        const deletedContent = await Content.findByIdAndDelete(req.params.contentId);
        console.log(deletedContent);
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
        req.error = error;
        return next();
    }
})

// router.get('/:contentId/edit', (req, res) => {
//     Content.findById(req.params.contentId, (error, updatedContent) => {
//         if(error) console.log(error);

//         console.log(updatedContent);
//         res.render('edit.ejs', {content: updatedContent})
//     })
// });

router.get('/:contentId/edit', async (req, res, next) => {
    try {
        const updatedContent = await Content.findById(req.params.contentId);
        console.log(updatedContent);
        return res.render('edit.ejs', { content: updatedContent })
    } catch (error) {
        console.log(error)
        req.error = error;
        return next();
    }
})

// router.put('/:contentId', (req, res) => {
//     Content.findByIdAndUpdate(req.params.contentId, req.body,(error, updatedContent) => {
//         if (error) return console.log(error);

//         console.log(updatedContent);

//         return res.redirect(`/fumblr/dashboard`);
//     });
// });

router.put('/:contentId', async (req, res, next) => {
    try {
        const updatedContent = await Content.findByIdAndUpdate(req.params.contentId, req.body)
        console.log(updatedContent);
        return res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
        req.error = error;
        return next();
    }
})

router.put('/like/:contentId', async (req, res, next) => {
    try {
        const likedBy = await User.find({ currentSession: req.sessionID })
        const likedContent = await Content.findById(req.params.contentId)
        console.log("I am the one who is liked!   :" + likedContent);
        const updatedContent = await Content.findByIdAndUpdate({_id:likedContent._id},{$push:{notes:likedBy}})
        console.log(updatedContent)
        return res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
        req.error = error;
        return next();
    }
})

// router.put('/like/:contentId', async (req, res, next) => {
//     try {
//         const likedBy = await User.findOne({ currentSession: req.sessionID})
//         const likedContent = await Content.findById(req.params.contentId)
//         const allNotes = likedContent.notes
//         const trueorfalse = allNotes[0] === undefined
//         const ispostalreadyliked = allNotes[0] === toString(likedBy._id)
//         console.log(ispostalreadyliked)
//         // console.log("Boolean value of trueorfalse: " + trueorfalse)
//         console.log("Im the variable likedBy: " + toString(likedBy._id))
//         console.log("hey I'm all the notes dude: " + allNotes[0])
//         if (trueorfalse===true) {
//             const updatedContent = await Content.findByIdAndUpdate({_id:likedContent._id},{$push:{notes:likedBy}})
//             console.log("Im being updated dog...: " + updatedContent)
//             return res.redirect('/fumblr/dashboard')
//         } else {
//             for (let i = 0; i < allNotes.length; i++) {
//                 if (likedBy[0]._id === allNotes[i]) {
//                     const updatedContent = await Content.findByIdAndUpdate({_id:likedContent._id},{$pull:{notes:likedBy}})
//                     console.log("Im going to take your like away...dog: " + updatedContent)
//                     return res.redirect('/fumblr/dashboard') 
//                 } else { 
//                     const updatedContent = await Content.findByIdAndUpdate({_id:likedContent._id},{$push:{notes:likedBy}})
//                     console.log("this is the second else that pushes a like:  " + updatedContent)
//                     return res.redirect('/fumblr/dashboard')
//                 }
//         }
//         } 
//     }
//     catch (error) {
//     console.log(error)
//     req.error = error;
//     return next();
//     }
// })

// router.get("/create_post", (req, res) => {
//     res.render("create_post.ejs")
// });

module.exports = router;