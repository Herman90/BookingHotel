(function(){
    angular.module('Authentication')
        .factory('AuthenticationService', authenticationService);

    authenticationService.$inject = ['$http', '$cookieStore', '$rootScope', 'Session'];

    function authenticationService($http, $cookieStore, $rootScope, Session) {
        var service = {
            login: login,
            setSession: setSession,
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized,
            signUp: signUp,
            checkIfLoggedIn: checkIfLoggedIn,
            logout: logout,
            clearCredentials: clearCredentials
        };

        return service;

        function login(email, password) {
            return $http.post('/login', { email: email, password: password })
                .then(loginComplete);
                //.catch(loginFailure);

            function loginComplete(res){
                setSession(res.data.id, res.data.user._id, res.data.user.role);
                return res.data.user;
            }
//            function loginFailure(erorr){
//                throw erorr;
//            }
        }

        function isAuthenticated() {
            return !!Session.userId;
        }

        function isAuthorized(authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (isAuthenticated() &&
                authorizedRoles.indexOf(Session.userRole) !== -1);
        }

        function signUp(email, password, isAdmin){
            return $http.post('/signup', { email: email, password: password, isAdmin: isAdmin })
                .then(signupComplete);
            function signupComplete(res){
                setSession(res.data.id, res.data.user._id, res.data.user.role);
                return res.data.user;
            }
        }

        function setSession(id, userId, role) {
            Session.create(id, userId, role);
        }

        function checkIfLoggedIn(){
            return $http.get('/profile');
        }

        function logout(){
            return $http.post('/logout').then(clearCredentials);
        }

        function clearCredentials() {
            Session.destroy();
        }
    }
})();
