angular.module('BookHotelApp')
    .controller('HeaderController', function ($scope, $location, AuthenticationService)
    {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    });


