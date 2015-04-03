(function(){
    angular.module('BookHotelApp').config(config);
    function config($httpProvider){
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
    }

    angular.module('BookHotelApp').factory('AuthInterceptor', authInterceptor);
    function authInterceptor($rootScope, $q,
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
    }
})();