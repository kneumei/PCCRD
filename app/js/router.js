angular.module("pccrd")
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider.when('/organizations', {
    templateUrl: '/views/organizations.html',
    controller: 'OrganizationsController'
  });

}]);
