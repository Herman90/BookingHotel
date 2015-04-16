(function(){
    angular.module('BookHotelApp')
        .controller('HeaderController', headerController);

    headerController.$inject = ['$scope', '$location', 'AuthenticationService'];

    function headerController($scope, $location, AuthenticationService)
    {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }
})();


