const express = require('express');
const app = express();
const controllers = require('./controllers')
const methodOverride = require('method-override');
require('./config/db.connection')
const PORT = 4000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use('/fumblr', controllers.blog);
app.use('/content', controllers.content)

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
    console.log(`I am listening on port ${PORT}`)
});