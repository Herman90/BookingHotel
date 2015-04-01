angular.module('Authentication')
    .controller('AuthCtrl',['$scope', '$rootScope', '$location', 'AuthenticationService', 'AUTH_EVENTS',
            function ($scope, $rootScope, $location, AuthenticationService, AUTH_EVENTS) {
                // reset login status
                AuthenticationService.ClearCredentials();

                $scope.error = "";
                $scope.login = function () {
                    $scope.dataLoading = true;
                    AuthenticationService.Login($scope.email, $scope.password).success(function(res) {
                        AuthenticationService.setSession(res.data.id, res.data.user._id,
                            res.data.user.role);
	                        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                            $location.path('/');
                            $scope.dataLoading = false;
                    }).error(function(erorr){
                            $scope.error = response.message;
                            $scope.dataLoading = false;
                            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                    });
                };
                $scope.signup = function(){
                    $scope.dataLoading = true;
                    AuthenticationService.SignUp($scope.email, $scope.password, $scope.isAdmin).success(function(res) {
                        AuthenticationService.setSession(res.data.id, res.data.user._id,
                            res.data.user.role);
                        $scope.dataLoading = false;
                        $rootScope.$broadcast(AUTH_EVENTS.registerSuccess);
                        return res.data.user;
                    }).error(function(erorr){
                            $scope.dataLoading = false;
                            alert('error');
                    })
                }


            }]
    )