var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({
    uploadDir: "e:\\test\\BOOK.HOTEL\\bookHotel\\public\\upload\\"
});
var Account = require('../models/account');

var needsRole = function(role) {
    return function(req, res, next) {
        if(req.isAuthenticated()){
            if (req.user && req.user.role === role)
                next();
            else
                res.send(403, 'Forbidden');
        }else{
            res.send(401, 'Unauthorized');
        }
    };
};

module.exports = function (app, passport) {
    app.get('/profile', function(req, res, next){
        if(req.isAuthenticated() && req.user){
            res.send({ data: { user: req.user, id: req.sessionID }});
        }
    });
    app.get('/', require('./start').get);
    app.get('/hotel', require('./hotels').getAll);
    app.post('/hotel/create', multipartMiddleware, require('./hotels').createHotel);
    app.get('/hotels/:hotelId', require('./hotels').getHotelById);
    app.delete('/hotel/:hotelId', needsRole('admin'), require('./hotels').deleteHotel);
    app.post('/login', passport.authenticate('local'), function(req, res) {
        res.send({ data: { user: req.user, id: req.sessionID }});
    });
    app.post('/logout', function(req, res){
        req.logout();
        res.send({data: {user: null}});
    });

//    app.post('/login', function(req, res, next) {
//        passport.authenticate('local', function(err, user, info) {
//            if (err) { return next(err); }
//            if (!user) { return res.send('/login'); }
//            req.logIn(user, function(err) {
//                if (err) { return next(err); }
//                return res.send(user.username);
//            });
//        })(req, res, next);
//    });

    app.post('/signup', passport.authenticate('signup'), function(req, res, next){
        res.send({ data: { user: req.user, id: req.sessionID }});
    });
//    app.get('/chat', checkAuth, require('./chat').get);
//
//    app.get('/login', require('./login').get);
//    app.post('/login', require('./login').post);
//    app.post('/logout', require('./logout').post);


}


