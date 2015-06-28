var ebApp = angular.module('ebApp');

ebApp.controller('overCtrl', ['$scope', '$http', '$window', 'UserService', 'AuthenticationService',
                               function($scope, $http, $window, UserService, AuthenticationService){
	$scope.currPort = 0;
	$scope.ports = ['Low Risk', 'High Risk', 'Fixed'];
	
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
	$scope.currentPort = function() { 
		return $scope.ports[$scope.currPort];
	};
	$scope.selectPort = function(choice) {
		$scope.currPort = $scope.ports.indexOf(choice);
	};
	$scope.portfolio = function(){
		return data;
	};
	$scope.gotoRecomm = function(){
		$window.location.href = 'recommend';
	};
	$scope.gotoOwned = function(){
		$window.location.href = 'portfolio';
	};
	$scope.gotoIndiv = function(){
		$window.location.href = 'investment';
	};
	
	data = [
	        ['SingTel', 10, '2015-06-19', +1.5, 5.3, 7.2], ['Keppel Corporation Limited', 15, '2015-04-21', +0.2, 23.2, 23.8], ['Elite Industries', 15, '2015-06-19', -0.5, 8.3, 5.6],
	        ['Noble', 5, '2015-06-18', -1.2, 32, 34.3], ['DBS', 50, '2015-05-21', +0.3, 28.3, 27.1], ['OCBC', 20, '2015-06-17', -0.2, 40.2, 38.1]];
	$scope.gainers = [['Singtel', 2.1, 0.8], ['AIM', 0.58, 0.3], ['Poh Tiong Choon', 0.8, 0.075], ['OSIM Intl', 1.695, 0.06]];
	$scope.losers = [['Jardine C&C', 34.040, -0.9], ['JSH USD', 30.710, -0.79], ['JMH USD', 56.53, -0.36], ['DBS', 20.52, -0.33]];
	
}]);