(function(){
    'use strict';
    angular.module('BookHotelApp').constant('AUTH_EVENTS', {
        registerSuccess: 'auth-register-success',
        registerFailed: 'auth-register-failed',
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    });
})();