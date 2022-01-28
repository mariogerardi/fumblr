const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const { User, Content } = require('../models');



router.get('/register', function (req, res) {
    return res.render('register.ejs');
})

router.post('/register', async function (req, res) {
    try {
        //check if user exists
        const foundUser = await User.exists({ email: req.body.email });
        //if so redirect to login
        if (foundUser) {
            console.log("This email is already in use, please use different email address")
            return res.redirect('./login')
        }
        //if not create user and redirect to login

        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(req.body.password, salt);

        req.body.password = hash;
        //create a new user in the database
        const newUser = await User.create(req.body);
        console.log(newUser);

        return res.redirect('./login');
    } catch (err) {
        console.log(err);
        return res.send(err);
    }
});

router.get('/login', function (req, res) {
    res.render('login.ejs');
})

router.post('/login', async function (req, res) {
    try {
        //check if user exists
        const foundUser = await User.findOne({ email: req.body.email });
        console.log(`found object is ${foundUser}`);
        //if not
        // redirect to register
        if (!foundUser) return res.send('Either email or password is incorrect');

        // if the user exists
        // validate the user if password match -> login
        // .compare(body password, hashed password) => return true or false
        const match = await bcrypt.compare(req.body.password, foundUser.password);

        //if not match send error
        if (!match) return res.send('Either email or password is incorrect');
        console.log(`the before version of req.session.currentUser is ${req.session.currentUser}`)

        //if match create the session and redirect to dashboard
        //here is the key card creation
        req.session.currentUser = {
            id: foundUser._id,
            username: foundUser.email
        };
        const foundContent = await Content.find({})

        console.log(req.session.currentUser)
        const foundUsr = await req.session.currentUser.id
        console.log("This is the found user" + " " + foundUsr + " ")
        // const foundUsers = await User.find({})
        // const context = {
        //     content: foundContent,
        //     user: foundUsr,
        //     allUsers: foundUsers
        // }
        console.log(req.sessionID)
        const foundSession = req.session.id
        console.log("Before I created a session, this is the foundSession: " + foundSession)
        const createdSession = await User.findByIdAndUpdate(foundUsr, {currentSession: foundSession})
        console.log("I created a session createdSession: " + createdSession)
        // return res.render('dashboard.ejs', context)
        return res.redirect('/fumblr/dashboard')
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})

router.get('/logout', async function (req, res) {
    try {

        await req.session.destroy();
        return res.redirect('./login');
    } catch (error) {
        console.log(error)
        return res.send(error);
    }
})

module.exports = router;