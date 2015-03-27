var mongoose = require('mongoose')
    , LocalStrategy = require('passport-local').Strategy
    , FacebookStrategy = require('passport-facebook').Strategy
    , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
    , User = require('models/user');


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
            passwordField: 'password'
        },
        function(email, password, done) {
            User.signup(email, password, done);
        }));

//    passport.use(new FacebookStrategy({
//            clientID: config.get('facebook:clientID'),
//            clientSecret: config.get('facebook:clientSecret'),
//            callbackURL: config.get('facebook:callbackURL')
//        },
//        function(accessToken, refreshToken, profile, done) {
//            profile.authOrigin = 'facebook';
//            User.findOrCreateOAuthUser(profile, function (err, user) {
//                return done(err, user);
//            });
//        }));
//
//    passport.use(new GoogleStrategy({
//            clientID: config.get('google:clientID'),
//            clientSecret: config.get('google:clientSecret'),
//            callbackURL: config.get('google:callbackURL')
//        },
//        function(accessToken, refreshToken, profile, done) {
//            profile.authOrigin = 'google';
//            User.findOrCreateOAuthUser(profile, function (err, user) {
//                return done(err, user);
//            });
//        }
//    ));
}