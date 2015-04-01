angular.module('BookHotelApp').directive('loginDialog', function (AUTH_EVENTS, $modal) {
	return {
		restrict: 'E',
		template: '<div class="modal fade">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '<h4 class="modal-title">{{ title }}</h4>' +
            '</div>' +
            '<div class="modal-body"></div>' +
            '</div>' +
            '</div>' +
            '</div>',
        replace:true,
        scope:true,
		link: function (scope, element, attrs) {
            var loginModal = $modal({title: 'Login Foem', contentTemplate: 'http://localhost:2526/public/partials/signin.html', show: false});
			var showDialog = function () {
                loginModal.$promise.then(loginModal.show);
			};

            scope.$watch(attrs.visible, function(value){
                if(value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

			scope.visible = false;
			scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
			scope.$on(AUTH_EVENTS.sessionTimeout, showDialog)
		}
	};
})