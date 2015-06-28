var ebApp = angular.module('ebApp');

ebApp.factory('AuthenticationService', function() {
    var auth = {
        isLogged: false
    }
 
    return auth;
});

ebApp.factory('UserService', function($http) {
    return {
        logIn: function(username, password) {
            return $http.post('/authenticate', {email: username, password: password})
		        .success(function(data, status, headers, config) {
		            //console.log('Success logging in user');
		        }).error(function(data, status, headers, config) {
		            //console.log("Error logging in user: " + data);
		        });
        },
 
        logOut: function() {
        	
        }
    }
});


ebApp.factory('TokenInterceptor', function ($q, $location, AuthenticationService) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if (window.localStorage.getItem('ebUserToken')) {
                config.headers.Authorization = /*'Bearer ' + */window.localStorage.getItem('ebUserToken');
            }
            return config;
        },
 
        requestError: function(rejection) {
            return $q.reject(rejection);
        },
 
        /* Set Authentication.isAuthenticated to true if 200 received */
        response: function (response) {
            if (response != null && response.status == 200 && window.localStorage.getItem('ebUserToken') && !AuthenticationService.isAuthenticated) {
                AuthenticationService.isAuthenticated = true;
            }
            return response || $q.when(response);
        },
 
        /* Revoke client authentication if 401 is received */
        responseError: function(rejection) {
            if (rejection != null && rejection.status === 401 && (window.localStorage.getItem('ebUserToken') || AuthenticationService.isAuthenticated)) {
            	window.localStorage.removeItem('ebUserToken');
                AuthenticationService.isAuthenticated = false;
                $location.path("/index");
            }
 
            return $q.reject(rejection);
        }
    };
});

ebApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
});
/*
ebApp.config(['$locationProvider', '$routeProvider',
    function($location, $routeProvider) {
      $routeProvider.
          when('/dev', {
              access: { requiredLogin: false }
          }).
          when('/account', {
              access: { requiredLogin: true }
          });
  }]);*/
/*ebApp.run(function($rootScope, $location, AuthenticationService) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        if (nextRoute.access.requiredLogin && !AuthenticationService.isLogged) {
            $location.path("/index");
        }
    });
});*/