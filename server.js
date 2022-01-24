const express = require('express');
const app = express();
// const controllers = require('./controllers')
const methodOverride = require('method-override');

const PORT = 4000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'))

app.get("/", function(req, res) {
    res.send("I am a test and I am working!")
})

app.get("/*", (req, res) => {
    const context = { error: req.error };
    return res.status(404).render("404", context);
});
        
app.listen(process.env.PORT || 4000, function() {
    console.log(`I am listening on port ${PORT}`)
});