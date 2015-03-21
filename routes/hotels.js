var Hotel = require('../models/hotel').Hotel;
var Room  = require('../models/room').Room;
var fs = require('fs');
var path = require('path');
var RoomType = require('../models/enums').RoomTypeEnum;

exports.getAll = function(req, res){
//    Room.find({}, function(err, rooms){
//        res.send(rooms)
//    });

    Hotel.find({},function(err, hotels){
        if(!err){
            Hotel.populate(hotels, {path: 'Rooms'}, function(err, hotels){
                if(!err){
                    res.send(hotels);
                }else{
                    res.send('Error');
                }
            });
        }
    });
};

exports.getHotelById = function(req, res){
    var hotelId = req.params.hotelId;
    if(hotelId){
        Hotel.findOne({_id: hotelId}, function(err, hotel){
            Hotel.populate(hotel, {path: 'Rooms'}, function(err, hotel){
                if(!err & !!hotel){
                    res.send(hotel);
                }else{
                    res.status(404);
                    res.send('No hotels found');
                }
            });

        });
    }
}

exports.deleteHotel = function(req, res){
    Hotel.remove({_id: req.params.hotelId}, function(){
        res.send({success: true});
    });
}

exports.createHotel = function(req, res){
    var appDir = path.dirname(require.main.filename);
    try{
        var file = req.files.file;
        fs.rename(file.path, appDir + '/public/upload/' + file.originalFilename, function(err){
            if(err) throw(err);
        });

        var rooms = JSON.parse(req.body.Rooms);
        delete req.body.Rooms;

        var hotel  = new Hotel(req.body);
        hotel.PictureURL = '/public/upload/' + file.originalFilename;
        hotel.save(function(err, hotel){
            if(!err){
                for(var i = 0; i < rooms.length; i++){
                    rooms[i].Type = RoomType.get(parseInt(rooms[i].Type)).key;
                    rooms[i].Hotel= hotel._id;
                    var room = new Room(rooms[i]);
                    room.save();
                    hotel.Rooms.push(room);
                }

                hotel.save();
                res.status('301');
                res.send('/hotel');
            }else{
                throw (err);
            }
        });
    }catch(e){
        res.status(500);
        res.send({error: e});
    }
};