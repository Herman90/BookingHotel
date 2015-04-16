(function(){
    angular.module('BookHotelApp').controller('MainCtrl', mainController);

    mainController.$inject = ['$scope', 'Hotel'];

    function mainController($scope, Hotel) {
        $scope.hotels = [];
        $scope.pageSize = 10;

        reloadData();

        function reloadData(){
            Hotel.getAll().then(function(response){
                $scope.hotels = response;
            });
        }

        $scope.removeHotel = function($hotelId){
            Hotel.delete($hotelId).success(function(data){
                if(data){
                    reloadData();
                }
            });
        }
    }
})();