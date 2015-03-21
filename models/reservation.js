var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReservationSchema = new Schema({
    Room: { type: Schema.ObjectId, ref: 'Room'},
    StartDate: {type:Date, require: true },
    EndDate: {type:Date, require: true },
    User: String
});

exports.Reservation = mongoose.model('Reservation', ReservationSchema);

