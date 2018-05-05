const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./connection').User

passport.serializeUser((user, done) => {
    if (user && user.id) {
        console.log('serializing user');
        return done(null, user.id);
    }
    done(new Error("User or User id not found"));
})

passport.deserializeUser((id, done) => {
    User.findOne({
        where: { id: id }
    }).then((user) => {
        if (user) {
            console.log('deserilizing user');
            done(null, user);
        } else {
            done(new Error("No such user found"));
        }
    }).catch((err) => done(err))
})

passport.use(new LocalStrategy((userName, password, done) => {
    User.findOne({
        where: { username: userName }
    }).then((user) => {
        if (!user) {
            return done(null, false, { message: 'Username does not exist' })
        }
        if (user.password !== password) {
            return done(null, false, { message: 'Password is wrong' })
        }
        console.log("User with these credentials has logged in successfully : " + userName + " " + password);
        done(null, user);
    }).catch((err) => done(err))
}))

module.exports = passport




