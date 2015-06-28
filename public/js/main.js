var ebApp = angular.module('ebApp', ['ui.bootstrap']);

ebApp.controller('loginCtrl', ['$scope', '$http', '$window', 'UserService', 'AuthenticationService',
           function ($scope, $http, $window, UserService, AuthenticationService) {
   	$scope.login = function() {
   		UserService.logIn($scope.userEmail, $scope.userPass)
   			.success(function(data) {
   				AuthenticationService.isLogged = true;
   				window.localStorage.setItem('ebUserToken', data.token);
   				window.localStorage.setItem('ebUserId', data.user.id);
   				window.localStorage.setItem('ebUserEmail', data.user.email);
   				$window.location.href = 'account';
   			}).error(function(status, data) {
   				AuthenticationService.isLogged = false;
   				window.localStorage.removeItem('ebUserToken');
   				window.localStorage.removeItem('ebUserId');
   				window.localStorage.removeItem('ebUserEmail');
   				$scope.userEmail = '';
   				$scope.userPass = '';
   				$scope.msg = 'Invalid Credentials!';
   			});
    };
}]);




ebApp.controller('debugCtrl', ['$scope', '$http', 'UserService', 'AuthenticationService',
        function ($scope, $http, UserService, AuthenticationService) {
	$scope.login = function() {
   		UserService.logIn('john@email.com', 'securepass')
   			.success(function(data) {
   				AuthenticationService.isLogged = true;
   				window.localStorage.setItem('ebUserToken', data.token);
   				window.localStorage.setItem('ebUserId', data.user.id);
   				window.localStorage.setItem('ebUserEmail', data.user.email);
   				$window.location.href = 'account';
   			}).error(function(status, data) {
   				$scope.userEmail = '';
   				$scope.userPass = '';
   				$scope.msg = 'Invalid Credentials!';
   			});
    };
    
    $scope.logout = function() {
    	window.localStorage.removeItem('ebUserToken');
    };
    
    $scope.createDummyData = function() {
    	$http.post('/dummyData', {});
    };
    
    $scope.createUser = function() {
    	$http.post('/createUser', {
            email : 'user@email.com',
            password : 'pass',
            name: 'testUser'
        }).success(function(data, status, headers, config) {
            console.log('Success creating user');
        }).error(function(data, status, headers, config) {
            console.log("Error creating user: " + data);
        });
    };
    
    $scope.getTrans = function() {
    	$http.get('/api/transactions').success(function(data, status, headers, config) {
            console.log(data);
        }).error(function(data, status, headers, config) {
            console.log("Ops: could not get any data");
        });
    };
}]);
