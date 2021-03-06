var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({
    uploadDir: "E:\\test\\BOOK.HOTEL\\bookHotelRepo\\public\\upload"
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
            res.send({ user: req.user, id: req.sessionID });
        }
    });
    app.get('/', require('./start').get);
    app.get('/hotel', require('./hotels').getAll);
    app.post('/hotel/create', needsRole('admin'), multipartMiddleware, require('./hotels').createHotel);
    app.get('/hotels/:hotelId', require('./hotels').getHotelById);
    app.delete('/hotel/:hotelId', needsRole('admin'), require('./hotels').deleteHotel);
	app.put('/hotel/:hotelId', needsRole('admin'), require('./hotels').updateHotel);
    app.post('/login', passport.authenticate('local'), function(req, res) {
        res.send({ user: req.user, id: req.sessionID });
    });
    app.post('/logout', function(req, res){
        req.logout();
        res.send({user: null});
    });

    app.post('/signup', passport.authenticate('signup'), function(req, res, next){
        res.send({ user: req.user, id: req.sessionID });
    });
}


