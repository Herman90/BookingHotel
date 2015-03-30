angular.module('Authentication', []);


angular.module('BookHotelApp', ['ngRoute', 'ngCookies',
         'angularFileUpload', 'angularUtils.directives.dirPagination', 'Authentication'])
    .config(function($routeProvider, USER_ROLES){
        $routeProvider
            .when('/', {
                templateUrl: 'http://localhost:2526/public/partials/main.html',
                controller: 'MainCtrl',
		        data: {
			        authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
		        }
            })
            .when('/about', {
                templateUrl: 'http://localhost:2526/public/partials/about.html',
                controller: 'AboutCtrl',
		        data: {
			        authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
		        }
            })
            .when('/hotel/create', {
                templateUrl: 'http://localhost:2526/public/partials/createHotel.html',
                controller: 'MainCtrl',
		        data: {
			        authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
		        }
            })
            .when('/hotels/:hotelId', {
                templateUrl: 'http://localhost:2526/public/partials/hotelDetails.html',
                controller: 'HotelCtrl',
		        data: {
			        authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
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
    })
    .config(function($httpProvider){
        $httpProvider.defaults.headers.post['Content-Type'] =  'application/json';
        $httpProvider.interceptors.push(function($q, $location) {
            return {
                response: function(response) {
                    // do something on success
                    return response;
                },
                responseError: function(response) {
                    if (response.status === 401) {
                        $location.url('/login');
                    }
                    return $q.reject(response);
                }
            };
        });
		$httpProvider.interceptors.push([
			'$injector',
			function ($injector) {
				return $injector.get('AuthInterceptor');
			}
		]);
    })
	.factory('AuthInterceptor', function ($rootScope, $q,
                                          AUTH_EVENTS) {
		return {
			responseError: function (response) {
				$rootScope.$broadcast({
					401: AUTH_EVENTS.notAuthenticated,
					403: AUTH_EVENTS.notAuthorized,
					419: AUTH_EVENTS.sessionTimeout,
					440: AUTH_EVENTS.sessionTimeout
				}[response.status], response);
				return $q.reject(response);
			}
		};
	})
    .filter('repeat', function(){
        return function(value, count){
            if(typeof count === "number"){
                return Array(count + 1).join(value);
            }
            return value;
        }
	}).run(function($rootScope, AUTH_EVENTS, USER_ROLES, AuthenticationService){
		$rootScope.$on('$routeChangeStart', function (event, next) {
            if(next.data){
                var authorizedRoles = next.data.authorizedRoles;
                if(authorizedRoles.indexOf(USER_ROLES.all) !== -1){
                    return;
                }
                if (!AuthenticationService.isAuthorized(authorizedRoles)) {
                    event.preventDefault();
                    if (AuthenticationService.isAuthenticated()) {
                        // user is not allowed
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                    } else {
                        // user is not logged in
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                    }
                }
            }
		});
	});
