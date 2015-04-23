(function(){
    'use strict';
    angular.module('BookHotelApp')
        .controller('HeaderController', headerController);

    headerController.$inject = ['$scope', '$location'];

    function headerController($scope, $location)
    {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }
})();


