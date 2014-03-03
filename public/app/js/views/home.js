angular.module('pccrd')
	.controller('HomeController',['$scope', '$location', function($scope, $location){
		$scope.organizations = [
			{
				name:"ABC",
				services:["homeless", "food"],
				slug:"ABC"
			},
			{
				name:"DEF",
				services:["shelter"],
				slug:"DEF"
			}
		];

		$scope.navigate = function(organization){
			$location.path('/organizations/'+organization.slug)
		}
}])