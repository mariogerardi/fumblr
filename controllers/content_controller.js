const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const { Content, User } = require('../models')


// router.get("/*", async (req, res) => {

//     //Looking for user based on the session ID
//     const currentUser = await User.find({ currentSession: req.sessionID })
//     console.log(currentUser)
//     console.log(req.params[0])
//     //check for link and return type associated to link
//     if (req.params[0] === "new-text-post") {
//         return res.render('new-content/new_text.ejs', currentUser)
//     }
//     else if (req.params[0] === "new-image-post") {
//         return res.render('new-content/new_image.ejs', currentUser)
//     } else if (req.params[0] === "new-quote-post") {
//         return res.render('new-content/new_quote.ejs', currentUser)
//     } else if (req.params[0] === 'new-link-post') {
//         return res.render('new-content/new_link.ejs', currentUser)
//     } else if (req.params[0] === 'new-chat-post') {
//         return res.render('new-content/new_chat.ejs', currentUser)
//     } else if (req.params[0] === 'new-audio-post') {
//         return res.render('new-content/new_link.ejs', currentUser)
//     } else if (req.params[0] === 'new-video-post') {
//         return res.render('new-content/new_video.ejs', currentUser)
//     } else {
//         const context = { error: req.error };
//         return res.status(404).render("404", context);
//     }
// });

router.get("/new-text-post", async (req, res) => {
    try {
        const foundUser = await User.find({ currentSession: req.sessionID })
        const context = {
            currentUser: foundUser
        }
        res.render("new-content/new_text.ejs", context)
    } catch (err) {
        console.log(err)
        return res.send(err)
    }
});

router.get("/new-image-post", async (req, res) => {
    try {
        const foundUser = await User.find({ currentSession: req.sessionID })
        const context = {
            currentUser: foundUser
        }
        res.render("new-content/new_image.ejs", context)
    } catch (err) {
        console.log(err)
        return res.send(err)
    }
});

router.get("/new-quote-post", async (req, res) => {
    try {
        const foundUser = await User.find({ currentSession: req.sessionID })
        const context = {
            currentUser: foundUser
        }
        res.render("new-content/new_quote.ejs", context)
    } catch (err) {
        console.log(err)
        return res.send(err)
    }
});

router.get("/new-link-post", async (req, res) => {
    try {
        const foundUser = await User.find({ currentSession: req.sessionID })
        const context = {
            currentUser: foundUser
        }
        res.render("new-content/new_link.ejs", context)
    } catch (err) {
        console.log(err)
        return res.send(err)
    }
});

router.get("/new-chat-post", async (req, res) => {
    try {
        const foundUser = await User.find({ currentSession: req.sessionID })
        const context = {
            currentUser: foundUser
        }
        res.render("new-content/new_chat.ejs", context)
    } catch (err) {
        console.log(err)
        return res.send(err)
    }
});

router.get("/new-audio-post", async (req, res) => {
    try {
        const foundUser = await User.find({ currentSession: req.sessionID })
        const context = {
            currentUser: foundUser
        }
        res.render("new-content/new_audio.ejs", context)
    } catch (err) {
        console.log(err)
        return res.send(err)
    }
});

router.get("/new-video-post", async (req, res) => {
    try {
        const foundUser = await User.find({ currentSession: req.sessionID })
        const context = {
            currentUser: foundUser
        }
        res.render("new-content/new_video.ejs", context)
    } catch (err) {
        console.log(err)
        return res.send(err)
    }
});

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

        res.redirect('/fumblr/dashboard')
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
        res.redirect('/fumblr/dashboard')
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
        return res.redirect('/fumblr/dashboard')
    } catch (error) {
        console.log(error)
        req.error = error;
        return next();
    }
})




// router.get("/create_post", (req, res) => {
//     res.render("create_post.ejs")
// });

module.exports = router;