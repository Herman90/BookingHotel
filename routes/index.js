var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({
    uploadDir: "e:\\test\\BOOK.HOTEL\\bookHotel\\public\\upload\\"
});

module.exports = function (app) {
    app.get('/', require('./start').get);
    app.get('/hotel', require('./hotels').getAll);
    app.post('/hotel/create', multipartMiddleware, require('./hotels').createHotel);
    app.get('/hotels/:hotelId', require('./hotels').getHotelById);
    app.delete('/hotel/:hotelId', require('./hotels').deleteHotel);
//    app.get('/chat', checkAuth, require('./chat').get);
//
//    app.get('/login', require('./login').get);
//    app.post('/login', require('./login').post);
//    app.post('/logout', require('./logout').post);
}


