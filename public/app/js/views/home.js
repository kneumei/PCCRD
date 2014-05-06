angular.module('pccrd')
	.controller('HomeCtrl',['$scope', '$location','dataCache', function($scope, $location, dataCache){
		$scope.organizations = [];

		dataCache.getOrganizations().then(function(organizations){
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