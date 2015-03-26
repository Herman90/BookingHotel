var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({
    uploadDir: "e:\\test\\BOOK.HOTEL\\bookHotel\\public\\upload\\"
});

module.exports = function (app, passport) {
    app.get('/', require('./start').get);
    app.get('/hotel', require('./hotels').getAll);
    app.post('/hotel/create', multipartMiddleware, require('./hotels').createHotel);
    app.get('/hotels/:hotelId', require('./hotels').getHotelById);
    app.delete('/hotel/:hotelId', require('./hotels').deleteHotel);
    app.post('/login', passport.authenticate('local'), function(req, res) {
        res.send(req.user);
    });

    app.get('/login', function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.send('/login'); }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.send(user.username);
            });
        })(req, res, next);
    });

    app.get('/signup', function(req, res, next){
        passport.authenticate('signup', function(err, user, info) {
            if (err) { return next(err); }
            if (!user) { return next(new Error(500)); }
            res.send({user: 'test'});
        })(req, res, next);
    })
//    app.get('/chat', checkAuth, require('./chat').get);
//
//    app.get('/login', require('./login').get);
//    app.post('/login', require('./login').post);
//    app.post('/logout', require('./logout').post);
}


