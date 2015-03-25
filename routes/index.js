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
    app.post('/login',function(req, res) {
        passport.authenticate('local', function(){
            var t=  0;
        });
        res.send(req.user);
    });
//    app.get('/chat', checkAuth, require('./chat').get);
//
//    app.get('/login', require('./login').get);
//    app.post('/login', require('./login').post);
//    app.post('/logout', require('./logout').post);
}


