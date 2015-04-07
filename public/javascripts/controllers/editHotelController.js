(function(){
	angular.module('BookHotelApp').controller('EditHotelController', editHotel);

	editHotel.$inject = ['$scope', '$location', 'hotel', 'Hotel'];

	function editHotel($scope, $location, hotel, Hotel){
		$scope.hotel = hotel;
		$scope.formData = hotel;

		$scope.update = function(){
			var updatedHotel = new Hotel(hotel);
			updatedHotel.update().then(function(data){
                $location.path('/hotels/' + data._id);
            });
		}
        $scope.addRoom = function(){
            $scope.formData.rooms.push({});
        }
	}
})();