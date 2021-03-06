(function(){
    'use strict';
    angular.module('BookHotelApp').config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider, USER_ROLES){
        $routeProvider
            .when('/', {
                templateUrl: '/public/partials/main.html',
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
                    authorizedRoles: [USER_ROLES.all]
                }
            })
            .when('/hotel/create', {
                templateUrl: 'http://localhost:2526/public/partials/createHotel.html',
                controller: 'CreateHotelController',
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
	        .when('/hotels/edit/:hotelId', {
		        templateUrl: 'http://localhost:2526/public/partials/editHotel.html',
		        controller: 'EditHotelController',
		        data: {
			        authorizedRoles: [USER_ROLES.admin]
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
