const express = require('express');
const app = express();
const controllers = require('./controllers')
const methodOverride = require('method-override');
const session = require("express-session");
const MongoStore = require("connect-mongo");

require('./config/db.connection')

const PORT = process.env.PORT || 4000

app.set('view engine', 'ejs');

app.use(
    session(
        {
        // where to store the sessions in mongodb
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),

        // secret key is used to sign every cookie to say its is valid
        secret: "super secret",
        resave: false,
        saveUninitialized: false,
        // configure the experation of the cookie
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // two weeks
        },
        }
    )
);

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use('/fumblr', controllers.blog);
app.use('/content', controllers.content)
app.use('/user', controllers.user)

app.use((req, res, next) => {    
    console.log("I'm running for another new route")
	console.log(`${req.method} ${req.originalUrl}`);    
	next();
});

app.get("/", function(req, res) {
    res.send("I am a test and I am working!")
});


app.get("/*", (req, res) => {
    const context = { error: req.error };
    return res.status(404).render("404", context);
});
        
app.listen(PORT, function() {
    console.log(`I am listening on ${PORT}`)
});