(function(){
    angular.module('BookHotelApp')
        .factory('Hotel', hotelService);

    hotelService.$inject = ['$http', '$upload']
    function hotelService($http, $upload){
        var Hotel = function(data) {
            angular.extend(this, data);
        }

        Hotel.get = function(id) {
            return $http.get('/hotels/' + id).then(function(response){
                if(response.status == 200){
                    return new Hotel(response.data);
                }
                return {};
            });
        };

        Hotel.getAll = function() {
            return $http.get('/hotel').then(function(response){
                if(response.status == 200){
                    return response.data;
                }
                return [];
            });
        };

        Hotel.delete = function(id){
            return $http.delete('/hotel/' + id, {id: id})
                .success(function(data){
                    return data.success;
                });
        }

	    Hotel.prototype.update = function(){
		    return $http.put('/hotel/' + this._id, this).then(updateCompleted).catch(error);
		    function updateCompleted(res){
			    return res.data.hotel;
		    }
		    function error(error){
			    console.log(error);
		    }
	    }

        Hotel.prototype.create = function(file){
            if(!file){
                throw ('No file selected');
            }
            var hotel = this;
            return $upload.upload({
                url: '/hotel/create',
                method: 'POST',
                data: hotel,
                file: file,
                contentType: 'application/json'
            });
        }
        return Hotel;
    }
})();