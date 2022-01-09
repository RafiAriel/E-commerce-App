var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bcrypt = require('bcryptjs');

module.exports = function (passport) {

    passport.use(new LocalStrategy(function (username, password, done) {

        User.findOne({username: username}, function (err, user) {
            if (err)
                console.log(err);

            if (!user) {
                return done(null, false, {message: 'No user found!'});
            }

            bcrypt.compare(password, user.password, function (err, isMatch) {
                if (err)
                    console.log(err);

                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Wrong password.'});
                }
            });
        });

    }));


    /*
    In serialize user you decide what to store in the session. 
    Here I'm storing the user id only.
    */
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });


    /*
    Here you retrieve all the info of the user from the session storage using
    the user id stored in the session earlier using serialize user.
    */
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

}

