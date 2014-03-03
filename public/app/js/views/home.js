angular.module('pccrd')
	.controller('HomeController',['$scope', '$location','Organization', function($scope, $location, Organizations){
		$scope.organizations = [];

		Organizations.query(function(organizations){
			angular.forEach(organizations, function(organization){
				$scope.organizations.push(organization);
			})
		}, function(){

		})


		$scope.navigate = function(organization){
			$location.path('/organizations/'+organization.slug)
		}
}])