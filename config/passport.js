var mongoose = require('mongoose')
var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user');


module.exports = function (passport, config) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({ _id: id }, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
            User.isValidUserPassword(email, password, done);
        }));

    passport.use('signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            User.signup(email, password, req.body.isAdmin, done);
        }));
}