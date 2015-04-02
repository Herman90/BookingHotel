
angular.module('BookHotelApp')
    .controller('MainCtrl',['$scope', '$upload', '$http', 'Hotel','AuthenticationService', '$alert',
		function ($scope, $upload, $http, Hotel,AuthenticationService, $alert, USER_ROLES) {

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
                        $alert({title: 'Great!', content: 'Hotel' + data.data.hotel.name + ' has been created successfuly', placement: 'top', type: 'info', show: true});
                        $scope.formData = {};
                    });
            };

            $scope.onFileSelect = function ($files) {
                $scope.uploadProgress = 0;
                $scope.selectedFile = $files;
            };
            $scope.addRoom = function(){
                $scope.formData.Rooms.push({});
            }

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
    ]);