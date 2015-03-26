var express = require('express');
var http = require('http');
var path = require('path');
require('enum').register();
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('./libs/mongoose');
var log = require('./libs/log')(module);
var app = express();
var config = require('./config');
var passport = require('passport');
app.engine('ejs', require('ejs-locals'));

var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

//app.use(function(req, res, next){
//    var err = req.session.error,
//        msg = req.session.notice,
//        success = req.session.success;
//
//    delete req.session.error;
//    delete req.session.success;
//    delete req.session.notice;
//
//    if (err) res.locals.error = err;
//    if (msg) res.locals.notice = msg;
//    if (success) res.locals.success = success;
//
//    next();
//});

app.use(cookieParser());
//app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(app.router);
require('./routes')(app, passport);


var server = http.createServer(app);
server.listen('2526', function () {
    log.info('Express server listening on port ' + '2526');
});
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    var is_ajax_request = req.xhr;
    if(is_ajax_request){
        res.status(404)
            .send('Not found');
    }else{
        next(err);
    }
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


//module.exports = app;
