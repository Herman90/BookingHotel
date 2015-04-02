angular.module('Authentication', []);


angular.module('BookHotelApp', ['ngRoute', 'ngCookies',
         'angularFileUpload', 'angularUtils.directives.dirPagination', 'Authentication', 'mgcrea.ngStrap'])
    .config(function($routeProvider, USER_ROLES){
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
                    if (response.status === 301) {
                        $location.url(response.data.url);
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
	}).constant('AUTH_EVENTS', {
        registerSuccess: 'auth-register-success',
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    }).constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        member: 'member'
    })
    .run(function($rootScope, AUTH_EVENTS, USER_ROLES, AuthenticationService){
        $rootScope.userRoles = USER_ROLES;
        $rootScope.isAuthorized = AuthenticationService.isAuthorized;
        $rootScope.isAuthenticated = AuthenticationService.isAuthenticated;
        $rootScope.currentUser  = null;
        $rootScope.logout = AuthenticationService.logout;

        AuthenticationService.checkIfLoggedIn().success(function(res){
            AuthenticationService.setSession(res.data.id, res.data.user._id, res.data.user.role);
            $rootScope.currentUser = res.data.user;
        });
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
