angular.module('Authentication')
    .controller('AuthCtrl',['$scope', '$rootScope', '$location', 'AuthenticationService',
            function ($scope, $rootScope, $location, AuthenticationService) {
                // reset login status
                AuthenticationService.ClearCredentials();

                $scope.error = "";
                $scope.login = function () {
                    $scope.dataLoading = true;
                    AuthenticationService.Login($scope.email, $scope.password).then(function(response) {
                        if(response.success) {
                            AuthenticationService.SetCredentials($scope.email, $scope.password);
                            $location.path('/');
                        } else {
                            $scope.error = response.message;
                            $scope.dataLoading = false;
                        }
                    })
                };
                $scope.signup = function(){
                    $scope.dataLoading = true;
                    AuthenticationService.SignUp($scope.email, $scope.password).then(function(response) {
                        if(response.success) {
                            AuthenticationService.SetCredentials($scope.email, $scope.password);
                            $location.path('/');
                        } else {
                            $scope.error = response.message;
                            $scope.dataLoading = false;
                        }
                    })
                }
            }]
    )