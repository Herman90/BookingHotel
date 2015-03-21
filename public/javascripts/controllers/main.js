
angular.module('BookHotelApp')
    .controller('MainCtrl',['$scope', '$upload', '$http', 'Hotel', function ($scope, $upload, $http, Hotel) {
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
    ]);