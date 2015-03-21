var mongoose = require('../libs/mongoose');
var Room = require('./room');

var Schema = mongoose.Schema;
var hotelSchema = new Schema({
    Name: {
        type: String,
        unique: false,
        required: true
    },
    PictureURL: String,
    Description: String,
    WebSite: String,
    NumberOfPhone: String,
    Rate: {
        type: Number,
        unique: false,
        require: true
    },
    Address: String,
    Rooms: [{type: Schema.ObjectId, ref: 'Room'}]
});

exports.Hotel = mongoose.model('Hotel', hotelSchema);
