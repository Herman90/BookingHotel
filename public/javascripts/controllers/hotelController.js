(function(){
    angular.module('BookHotelApp')
        .controller('HotelCtrl', hotelController);
    hotelController.$inject = ['$scope', '$routeParams', 'hotel'];
    function hotelController($scope, $routeParams, hotel){
        $scope.hotel = hotel;
        $scope.isEdit = false;
    }
})();
