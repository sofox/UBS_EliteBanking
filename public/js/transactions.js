var ebApp = angular.module('ebApp');

ebApp.controller('transCtrl', ['$scope', '$http', '$window', 'UserService', 'AuthenticationService',
                               function($scope, $http, $window, UserService, AuthenticationService){
	$scope.currMonth = 12;
	$scope.months = ['January', 'February', 'March', 'April', 'May', 'June',
	                 'July', 'August', 'September', 'October', 'November', 'December', 'All'];
	$scope.status = {
		isopen: false
	};
	
	$scope.toggled = function(open) {
		
	};
	$scope.toggleDropdown = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.status.isopen = !$scope.status.isopen;
	};
	$scope.currentMonth = function() { 
		return $scope.months[$scope.currMonth];
	};
	$scope.selectMonth = function(choice) {
		$scope.currMonth = $scope.months.indexOf(choice);
	};
	$scope.getMerchName = function(merchId) {
		return $scope.merchNames[merchId];
	};
	
	$http.get('/api/transactions/' + window.localStorage.getItem('ebUserId'))
		.success(function(data, status, headers, config) {
        $scope.transactions = data;
        $scope.merchNames = {};
        if (data == "") {
            $scope.transactions = [];
        }
        for (var i = 0; i < $scope.transactions.length; i++) {
        	var trans = $scope.transactions[i];
        	$http.get('/api/merchant/' + trans.merchant)
			.success(function(data, status, headers, config) {
				$scope.merchNames[data.id] = data.name;
		    });
        }
    }).error(function(data, status, headers, config) {
    	if (status == 401) {
			AuthenticationService.isLogged = false;
			window.localStorage.removeItem('ebUserToken');
			window.localStorage.removeItem('ebUserId');
			window.localStorage.removeItem('ebUserEmail');
			$window.location.href = '/';
		}
        console.log("Ops: could not get any data");
    });
	
}]);