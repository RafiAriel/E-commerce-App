var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcryptjs');

// Get Users model
var User = require('../models/user');

/*
 * POST register
 */
router.post('/register', function (req, res) {

    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    req.checkBody('username', 'Username is required!').notEmpty();
    req.checkBody('email', 'Email is required!').isEmail();
    req.checkBody('password', 'Password is required!').notEmpty();
    req.checkBody('password2', 'Passwords do not match!').equals(password);

    var errors = req.validationErrors();

    if (errors) {
        return res.json(errors);   
    } else {
        User.findOne({username: username}, function (err, user) {
            if (err)
                return res.json(err);   

            if (user) {
                return res.json("Username exists, choose another!");   
            } else {
                var user = new User({
                    name: "null",
                    email: email,
                    username: username,
                    password: password,
                    admin: 0
                });

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(user.password, salt, function (err, hash) {
                        if (err)
                            return res.json(err);   

                        user.password = hash;

                        user.save(function (err) {
                            if (err) {
                                return res.json(err);   
                            } else {
                                return res.json("OK");
                            }
                        });
                    });
                });
            }
        });
    }

});

/*
 * POST login
 */
router.post('/login', function (req, res, next) {
try {
    passport.authenticate('local', function(err, user, info) {
        if (err) { throw err; }
        return res.json(user);
      })(req, res, next);
    
} catch (error) {
}
}); 

/*
 * GET logout
 */
router.get('/logout', function (req, res) {
    try {
        req.logout();
        return res.json("OK");
    } catch (error) {
        
    }
});

// Exports
module.exports = router;


