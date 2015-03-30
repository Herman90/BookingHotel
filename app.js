var express = require('express');
var http = require('http');
var path = require('path');
require('enum').register();
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('./libs/mongoose');
var log = require('libs/log')(module);
var app = express();
var config = require('./config');
var passport = require('passport');
require('./config/passport')(passport, config)
app.engine('ejs', require('ejs-locals'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());


//app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(app.router);
require('./routes')(app, passport);


var server = http.createServer(app);
server.listen(config.get('port'), function () {
    log.info('Express server listening on port ' + config.get('port'));
});
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.status(404);
    if (req.accepts('html')) {
        next(err)
        return;
    }
    if (req.accepts('json')) {
        res.send({ error: 'Not found', code: 404 });
        return;
    }
    res.type('txt').send('Not found');
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
//        res.render('error', {
//            message: err.message,
//            error: err
//        });
        var err = new Error('Not Found');
        err.status = 404;
        res.status(404);
        if (req.accepts('html')) {
            next(err)
            return;
        }
        if (req.accepts('json')) {
            res.send({ error: 'Not found', code: 404 });
            return;
        }
        res.type('txt').send('Not found');
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
//    res.render('error', {
//        message: err.message,
//        error: {}
//    });
    var err = new Error('Not Found');
    err.status = 404;
    res.status(404);
    if (req.accepts('html')) {
        next(err)
        return;
    }
    if (req.accepts('json')) {
        res.send({ error: 'Not found', code: 404 });
        return;
    }
    res.type('txt').send('Not found');
});


//module.exports = app;
