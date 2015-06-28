var ebApp = angular.module('ebApp');

ebApp.controller('reportCtrl', ['$scope', '$http', '$window', 'UserService', 'AuthenticationService',
                                  function($scope, $http, $window, UserService, AuthenticationService){
	var d = new Date();
	$scope.currMonth = d.getMonth();
	$scope.months = ['January', 'February', 'March', 'April', 'May', 'June',
	                 'July', 'August', 'September', 'October', 'November', 'December', 'All'];
	$scope.inout = 0;
	$scope.inoutText = ['Outgoing', 'Incoming'];
	$scope.userNames = {};
	$scope.getMerchName = function(merchId) {
		return $scope.merchNames[merchId];
	};
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
	
	$scope.status2 = {
		isopen: false
	};
	$scope.toggleDropdown2 = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.status2.isopen = !$scope.status2.isopen;
	};
	
	$scope.currentMonth = function() { 
		return $scope.months[$scope.currMonth];
	};	
	$scope.selectMonth = function(choice) {
		$scope.currMonth = $scope.months.indexOf(choice);
	};
	$scope.selectInOut = function(choice) {
		$scope.inout = $scope.inoutText.indexOf(choice);
	};
	$scope.getUserName = function(uId) {
		return $scope.userNames[uId];
	};
	
	$http.get('/api/user/' + window.localStorage.getItem('ebUserId'))
		.success(function(data, status, headers, config) {
			$scope.balance = data.balance;
		});
	
	$http.get('/api/transfers/out/' + window.localStorage.getItem('ebUserId'))
		.success(function(data, status, headers, config) {
        $scope.outgoing = data;
        if (data == "") {
            $scope.outgoing = [];
        }
        for (var i = 0; i < $scope.outgoing.length; i++) {
        	var trans = $scope.outgoing[i];
        	if (trans.date.substring(5, 7) != ($scope.currMonth+1)) {
	    		$scope.outgoing.splice(i, 1);
	    		i--;
	    	}
        	$http.get('/api/user/' + trans.to)
			.success(function(data, status, headers, config) {
				$scope.userNames[data.id] = data.name;
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
	
	$http.get('/api/transfers/in/' + window.localStorage.getItem('ebUserId'))
		.success(function(data, status, headers, config) {
	    $scope.incoming = data;
	    if (data == "") {
	        $scope.transfers = [];
	    }
	    $scope.innames = [];
	    for (var i = 0; i < $scope.incoming.length; i++) {
	    	var trans = $scope.incoming[i];
	    	if (trans.date.substring(5, 7) != ($scope.currMonth+1)) {
	    		$scope.incoming.splice(i, 1);
	    		i--;
	    	}
	    	$http.get('/api/user/' + trans.from)
			.success(function(data, status, headers, config) {
				$scope.userNames[data.id] = data.name;
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
	
	$http.get('/api/transactions/' + window.localStorage.getItem('ebUserId'))
		.success(function(data, status, headers, config) {
	    $scope.transactions = data;
	    $scope.merchNames = {};
	    if (data == "") {
	        $scope.transactions = [];
	    }
	    for (var i = 0; i < $scope.transactions.length; i++) {
	    	var trans = $scope.transactions[i];
	    	if (trans.date.substring(5, 7) != ($scope.currMonth+1)) {
	    		$scope.transactions.splice(i, 1);
	    		i--;
	    	}
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