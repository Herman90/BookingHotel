(function(){
    angular.module('Authentication').factory('AuthResolver', authResolver);

    function authResolver($q, $rootScope, $location) {
        return {
            resolve: function () {
                var deferred = $q.defer();
                var unwatch = $rootScope.$watch('currentUser', function (currentUser) {
                    if (angular.isDefined(currentUser)) {
                        if (currentUser) {
                            deferred.resolve(currentUser);
                        } else {
                            deferred.reject();
                            $location.path('\login');
                        }
                        unwatch();
                    }
                });

                return deferred.promise;
            }
        };
    }
})();
