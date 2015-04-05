(function(){
	angular.module('BookHotelApp').controller('EditHotelController', editHotel);

	editHotel.$inject = ['$scope', 'hotel', 'Hotel'];

	function editHotel($scope, hotel, Hotel){
		$scope.hotel = hotel;
		$scope.formData = hotel;

		$scope.update = function(){
			var updatedHotel = new Hotel(hotel);
			updatedHotel.update();
		}
	}
})();