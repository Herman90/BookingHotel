
var mongoose = require('../libs/mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    Type: String,
    Count: Number,
    Size: Number,
    Hotel: {
        type: Schema.ObjectId,
        ref: 'Hotel'
    },
    Reservations: [{type: Schema.ObjectId, ref: 'Reservation'}]
});

exports.Room = mongoose.model('Room', RoomSchema);