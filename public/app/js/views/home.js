angular.module('pccrd')
	.controller('HomeController',['$scope', '$location','Organization', function($scope, $location, Organizations){
		$scope.organizations = [];

		Organizations.query(function(organizations){
			angular.forEach(organizations, function(organization){
				var model = {
					slug: organization.slug,
					name: organization.name,
					services: _.uniq(_.pluck(organization.services, "type"))
				}
				$scope.organizations.push(model);
			})
		});


		$scope.navigate = function(organization){
			$location.path('/organizations/'+organization.slug)
		}
}])