var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('./libs/mongoose');
var log = require('./libs/log')(module);
var app = express();
var config = require('./config');
var passport = require('passport');
var session = require('express-session');

require('enum').register();
require('./config/passport')(passport, config);

app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(express.cookieParser(config.get('session:secret')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.session(config.get('session')));
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
    var err = new Error('Some error');
    err.status = 500;
    res.status(500);
    if (req.accepts('html')) {
        next(err)
        return;
    }
    if (req.accepts('json')) {
        res.send({ error: req.error, code: req.error });
        return;
    }
    res.type('txt').send('Not found');
});


app.use(function(err, req, res, next) {
    if (req.accepts('html')) {
        next(err)
        return;
    }
    if (req.accepts('json')) {
        res.send(err);
        return;
    }
    res.type('txt').send(err);
});
