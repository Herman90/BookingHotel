
angular.module('BookHotelApp')
    .controller('MainCtrl',['$scope', '$upload', '$http', 'Hotel','AuthenticationService',
		function ($scope, $upload, $http, Hotel,AuthenticationService, USER_ROLES) {
		$scope.currentUser = null;
		$scope.userRoles = USER_ROLES;
		$scope.isAuthorized = AuthenticationService.isAuthorized;

		$scope.setCurrentUser = function (user) {
			$scope.currentUser = user;
		};

        $scope.hotels = [];
        $scope.pageSize = 10;
        $scope.formData = {
            Rooms: [{}]
        };
            $scope.selectedFile = [];
            $scope.uploadProgress = 0;

        function reloadData(){
            Hotel.getAll().then(function(response){
                $scope.hotels = response;
            });
        }

        reloadData();

        $scope.removeHotel = function($hotelId){
            Hotel.delete($hotelId).success(function(data){
                if(data){
                    reloadData();
                }
            });
        }

        $scope.uploadFile = function () {
            var hotel = new Hotel($scope.formData);
            hotel.create($scope.selectedFile[0])
                .progress(function (evt) {
                    $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total, 10);
                }).success(function (data) {
                    $scope.formData = {};
                });
        };

        $scope.onFileSelect = function ($files) {
            $scope.uploadProgress = 0;
            $scope.selectedFile = $files;
        };

    }]).directive('progressBar', [
        function () {
            return {
                link: function ($scope, el, attrs) {
                    $scope.$watch(attrs.progressBar, function (newValue) {
                        el.css('width', newValue.toString() + '%');
                    });
                }
            };
        }
    ]).constant('AUTH_EVENTS', {
		loginSuccess: 'auth-login-success',
		loginFailed: 'auth-login-failed',
		logoutSuccess: 'auth-logout-success',
		sessionTimeout: 'auth-session-timeout',
		notAuthenticated: 'auth-not-authenticated',
		notAuthorized: 'auth-not-authorized'
	}).constant('USER_ROLES', {
		all: '*',
		admin: 'admin',
		editor: 'editor',
		guest: 'guest'
	});