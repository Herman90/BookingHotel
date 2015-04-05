(function(){
    angular.module('BookHotelApp')
        .controller('HeaderController', headerController);

    function headerController($scope, $location, AuthenticationService)
    {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }
})();


