(function(){
    'use strict';
    angular.module('Authentication', []);
    angular.module('BookHotelApp', ['ngRoute', 'ngCookies',
         'angularFileUpload', 'angularUtils.directives.dirPagination', 'Authentication', 'mgcrea.ngStrap'])
    .run(function($rootScope, AUTH_EVENTS, USER_ROLES, AuthenticationService){
        $rootScope.userRoles = USER_ROLES;
        $rootScope.isAuthorized = AuthenticationService.isAuthorized;
        $rootScope.isAuthenticated = AuthenticationService.isAuthenticated;
        $rootScope.currentUser  = null;
        $rootScope.logout = function(){
            AuthenticationService.logout().then(function(){
                $rootScope.currentUser  = null;
            });
        };

        AuthenticationService.checkIfLoggedIn().then(function(res){
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
})();
