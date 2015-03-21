angular.module('BookHotelApp')
    .controller('HotelCtrl', function($scope, $routeParams, $http, Hotel){
        $scope.hotelId = $routeParams.hotelId;
        $scope.hotel = {};
        $scope.isEdit = false;
        if($scope.hotelId){
            Hotel.get($scope.hotelId).then(function(hotel){
                $scope.hotel = hotel;
            });

        }
    })
