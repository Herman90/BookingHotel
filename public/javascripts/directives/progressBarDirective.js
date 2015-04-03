(function(){
    angular.module('BookHotelApp').directive('progressBar', [progressBarDirective]);

    function progressBarDirective() {
        return {
            link: function ($scope, el, attrs) {
                $scope.$watch(attrs.progressBar, function (newValue) {
                    el.css('width', newValue.toString() + '%');
                });
            }
        };
    }
})();