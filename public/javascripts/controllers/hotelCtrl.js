(function(){
    angular.module('BookHotelApp')
        .controller('HotelCtrl', hotelController);
    function hotelController($scope, $routeParams, hotel){
        $scope.hotel = hotel;
        $scope.isEdit = false;
    }
})();
