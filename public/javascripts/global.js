angular.module('BookHotelApp', ['ngRoute', 'angularFileUpload', 'angularUtils.directives.dirPagination'])
    .config(function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'http://localhost:2526/public/partials/main.html',
                controller: 'MainCtrl'
            })
            .when('/about', {
                templateUrl: 'http://localhost:2526/public/partials/about.html',
                controller: 'AboutCtrl'
            })
            .when('/hotel/create', {
                templateUrl: 'http://localhost:2526/public/partials/createHotel.html',
                controller: 'MainCtrl'
            })
            .when('/hotels/:hotelId', {
                templateUrl: 'http://localhost:2526/public/partials/hotelDetails.html',
                controller: 'HotelCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .config(function($httpProvider){
        $httpProvider.defaults.headers.post = {};
    })
    .service('DataService', function($http){

    })
    .filter('repeat', function(){
        return function(value, count){
            if(typeof count === "number"){
                return Array(count + 1).join(value);
            }
            return value;
        }
    });
