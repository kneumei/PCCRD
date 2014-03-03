angular.module("pccrd")
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider
  	.when('/', {templateUrl: 'public/app/js/views/home.html', controller:'HomeController'})
  	.when('/organizations/:id', { templateUrl: 'public/app/js/views/organization-view.html', controller: 'OrganizationController'})
}]);
