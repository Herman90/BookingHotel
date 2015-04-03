(function(){
    angular.module('BookHotelApp').config(config);
    function config($routeProvider, USER_ROLES){
        $routeProvider
            .when('/', {
                templateUrl: 'http://localhost:2526/public/partials/main.html',
                controller: 'MainCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
//                resolve: {
//                    auth: function resolveAuthentication(AuthResolver) {
//                        return AuthResolver.resolve();
//                    }
//                }
            })
            .when('/about', {
                templateUrl: 'http://localhost:2526/public/partials/about.html',
                controller: 'AboutCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.member]
                }
            })
            .when('/hotel/create', {
                templateUrl: 'http://localhost:2526/public/partials/createHotel.html',
                controller: 'MainCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })
            .when('/hotels/:hotelId', {
                templateUrl: 'http://localhost:2526/public/partials/hotelDetails.html',
                controller: 'HotelCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.member]
                },
                resolve: {
                    hotel: function($route, Hotel){
                        var hotelId = $route.current.params.hotelId;
                        if(hotelId){
                            return Hotel.get(hotelId);
                        }
                    }
                }
            })
            .when('/login', {
                templateUrl: 'http://localhost:2526/public/partials/signin.html',
                controller: 'AuthCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })
            .when('/signup', {
                templateUrl: 'http://localhost:2526/public/partials/signup.html',
                controller: 'AuthCtrl',
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();
