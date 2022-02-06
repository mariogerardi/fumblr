const express = require('express');
const app = express();
const controllers = require('./controllers')
const methodOverride = require('method-override');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { Blog, Content, User } = require('./models');

require('./config/db.connection')

const PORT = process.env.PORT || 4000

app.set('view engine', 'ejs');

app.use(
    session(
        {
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
        secret: "super secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // two weeks
        },
        }
    )
);

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use('/blog', controllers.blog);
app.use('/content', controllers.content)
app.use('/user', controllers.user)

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/dashboard', async function (req, res, next) {
    try {
        const foundContent = await Content.find({})
        const foundUsers = await User.find({})
        const foundUser = await User.find({currentSession: req.sessionID})
        if (!foundUser) return res.redirect('/user/login')
        console.log("Hey hey, the current user is " + foundUser[0].userName)
        const foundBlogs = await Blog.find({});
        const foundBlog = await Blog.findOne({_id: foundUser[0].blog})
        if (!foundBlog) return res.redirect('/blog/blog-creation')
        console.log("The current user's blog: " + foundBlog.title)
        const context = { 
            content: foundContent,
            allUsers: foundUsers,
            currentUser: foundUser,
            allBlogs: foundBlogs,
            currentBlog: foundBlog
        }
        res.render('dashboard.ejs', context)
    } catch (err) {
        console.log(err);
        res.send(err);
        return next();
    }
})

app.get("/*", (req, res) => {
    const context = {error: req.error};
    return res.status(404).render("404", context);
});
        
app.listen(PORT, function() {
    console.log(`I am listening on ${PORT}`)
});