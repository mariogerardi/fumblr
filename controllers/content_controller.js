const express = require('express');
const router = express.Router();
const { Content } = require('../models')

router.get("/new-text-post", (req, res) => {
    res.render("new-content/new_text.ejs")
});

router.get("/new-image-post", (req, res) => {
    res.render("new-content/new_image.ejs")
});

router.get("/new-quote-post", (req, res) => {
    res.render("new-content/new_quote.ejs")
});

router.get("/new-link-post", (req, res) => {
    res.render("new-content/new_link.ejs")
});

router.get("/new-chat-post", (req, res) => {
    res.render("new-content/new_chat.ejs")
});

router.get("/new-audio-post", (req, res) => {
    res.render("new-content/new_audio.ejs")
});
router.get("/new-video-post", (req, res) => {
    res.render("new-content/new_video.ejs")
});

// router.post('/', (req, res) => {
//     Content.create(req.body, (error, createdContent) => {
//         if(error) console.log(error);
//         console.log(createdContent);
        
        
//         res.redirect("/fumblr/dashboard");
//     })
// });

router.post('/', async function(req, res) {
    try {
        const createdContent = await Content.create(req.body)
        if(!createdContent) return res.send('No Content being created (ﾉ*ФωФ)ﾉ)')
        console.log(createdContent)

        res.redirect('/fumblr/dashboard')
    } catch(err) {
        console.log(err);
        return res.send(err); 
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
    try{
        const foundContent = await Content.findOne(req.params._id)
        if (!foundContent) return res.send('No content found !!! ผ(•̀_•́ผ)')
        console.log(foundContent)

        res.render('show.ejs', foundContent)
    } catch(err) {
        console.log(err);
        return res.send(err);
    }
});


router.delete('/:contentId', (req, res) => {
    Content.findByIdAndDelete(req.params.contentId, (error, deleteContent) => {
        if(error) {
            console.log(error);
            res.send(error);
        }

        console.log(deleteContent);
        res.redirect("/fumblr/dashboard");
    })
});

router.get('/:contentId/edit', (req, res) => {
    Content.findById(req.params.contentId, (error, updatedContent) => {
        if(error) console.log(error);
        
        console.log(updatedContent);
        res.render('edit.ejs', {content: updatedContent})
    })
});

router.put('/:contentId', (req, res) => {
    Content.findByIdAndUpdate(req.params.contentId, req.body,(error, updatedContent) => {
        if (error) return console.log(error);

        console.log(updatedContent);

        return res.redirect(`/fumblr/dashboard`);
    });
});





// router.get("/create_post", (req, res) => {
//     res.render("create_post.ejs")
// });

module.exports = router;