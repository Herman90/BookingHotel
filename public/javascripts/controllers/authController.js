(function(){
    'use strict';
    angular.module('Authentication')
        .controller('AuthCtrl',['$scope', '$rootScope', '$location', 'AuthenticationService', 'AUTH_EVENTS', authController]);

    function authController($scope, $rootScope, $location, AuthenticationService, AUTH_EVENTS) {
        // reset login status
        AuthenticationService.clearCredentials();

        $scope.error = "";
        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.login($scope.email, $scope.password).then(function() {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $location.path('/');
                $scope.dataLoading = false;
            }).catch(function(erorr){
                    $scope.error = erorr.message || "Email or password is incorrect. Please try again.";
                    $scope.dataLoading = false;
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
        };
        $scope.signup = function(){
            $scope.dataLoading = true;
            AuthenticationService.signUp($scope.email, $scope.password, $scope.isAdmin).then(function(res) {
                $scope.dataLoading = false;
                $rootScope.$broadcast(AUTH_EVENTS.registerSuccess);
                return res.data.user;
            }).catch(function(erorr){
                    $scope.dataLoading = false;
                    alert('error: ' + error);
                })
        }
    }
})();