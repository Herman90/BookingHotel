(function(){
	angular.module('BookHotelApp').controller('CreateHotelController', createHotelController);

	createHotelController.$inject = ['$scope', 'Hotel', '$alert'];

	function createHotelController($scope, Hotel, $alert){
		$scope.formData = {
			rooms: [{}]
		};
		$scope.selectedFile = [];
		$scope.uploadProgress = 0;

		$scope.uploadFile = function () {
			var hotel = new Hotel($scope.formData);
			hotel.create($scope.selectedFile[0])
				.progress(function (evt) {
					$scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total, 10);
				}).success(function (data) {
					$alert({title: 'Great!', content: 'Hotel' + data.data.hotel.name + ' has been created successfuly', placement: 'top', type: 'info', show: true});
					$scope.formData = {};
				});
		};

		$scope.onFileSelect = function ($files) {
			$scope.uploadProgress = 0;
			$scope.selectedFile = $files;
		};
		$scope.addRoom = function(){
			$scope.formData.rooms.push({});
		};
	}
})();