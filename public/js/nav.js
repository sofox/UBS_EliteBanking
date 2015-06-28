var ebApp = angular.module('ebApp');

ebApp.controller('navCtrl', ['$scope', '$http', '$window', 'UserService', 'AuthenticationService',
           function ($scope, $http, $window, UserService, AuthenticationService) {
	
	$scope.logout = function() {
		AuthenticationService.isLogged = false;
		window.localStorage.removeItem('ebUserToken');
		window.localStorage.removeItem('ebUserId');
		window.localStorage.removeItem('ebUserEmail');
		$window.location.href = '/';
	};
	$scope.getUserEmail = function(){
		return window.localStorage.getItem('ebUserEmail');
	};
	
	$scope.loggedIn = function() {
		if (window.localStorage.getItem('ebUserToken') != null)
			return true;
		return false;
	};
	
}]);