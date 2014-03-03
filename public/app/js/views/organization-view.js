angular.module('pccrd')
	.controller('OrganizationController',['$scope', '$routeParams', 'Organization', 
		function($scope, $routeParams, Organization){
			Organization.get({slug:$routeParams.id}, 
				function(organization){
				$scope.message = "DONE"
				$scope.organization = organization
			}, function(){
				$scope.message = "FAILED"
			})
}]);