// Author : Gourish Vashisht
const express = require('express')
const path = require('path')
const session = require('express-session')
const passport = require('./passport')
const User = require('./connection').User

const app = express()

app.use(express.static('stylesheets'))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(session({
    secret: 'some very very secret thing',
    resave: false,
    saveUninitialized: false
}))

// to initialise the pasport service
app.use(passport.initialize())
app.use(passport.session())

app.use('/', (req, res, next) => {
    express.static(path.join(__dirname, 'public'))
    next()
})

app.post('/login', passport.authenticate('local', {
    failureRedirect: '/index.html',
    successRedirect: '/dashboard.html'
}))

app.get('/logout',
    function (req, res) {
        req.logout();
        res.redirect('/index.html');
    })

app.use('/api', require('./routes/api').route)

app.use('/', (req, res, next) => {
    if (req.path == '/signup.html') {
        res.sendFile('signup.html', { root: path.join(__dirname, 'public') })
    }
    else if (req.user != null) {
        res.sendFile(req.path, { root: path.join(__dirname, 'public') })
    }
    else {
        res.sendFile('index.html', { root: path.join(__dirname, 'public') })
    }
})

app.listen(8080, () => console.log('Server started at port : 8080'))