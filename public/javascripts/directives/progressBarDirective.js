(function(){
    angular.module('BookHotelApp').directive('progressBar', [progressBarDirective]);

    function progressBarDirective() {
        var directive = {
            link: link
        }
        return directive;

        function link($scope, el, attrs) {
            $scope.$watch(attrs.progressBar, function (newValue) {
                el.css('width', newValue.toString() + '%');
            });
        }
    }
})();