(function(){
    'use strict';
    angular.module('Authentication')
        .service('Session', sessionService);

    function sessionService() {
        /*jshint validthis:true */
        this.create = function (sessionId, userId, userRole) {
            this.id = sessionId;
            this.userId = userId;
            this.userRole = userRole;
        };
        this.destroy = function () {
            this.id = null;
            this.userId = null;
            this.userRole = null;
        };
    }
})();