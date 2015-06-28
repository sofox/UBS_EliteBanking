var ebApp = angular.module('ebApp');

ebApp.controller('recommCtrl', ['$scope', '$http', '$window', 'UserService', 'AuthenticationService',
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
	$scope.gainers = [['Singtel', 2.1, 0.8], ['AIM', 0.58, 0.3], ['Poh Tiong Choon', 0.8, 0.075], ['OSIM Intl', 1.695, 0.06]];
	$scope.losers = [['Jardine C&C', 34.040, -0.9], ['JSH USD', 30.710, -0.79], ['JMH USD', 56.53, -0.36], ['DBS', 20.52, -0.33]];
	$scope.recomm = [['Keppel Corporation Limited', 11.2, +0.4], ['Pan Pacific Hotels Group Limited', 8.4, 1.2], ['Sinopipe HOlidings Limited', 5.3, -0.1], ['United Overseas Bank Limited', 28.1, 2.1]];
}]);