angular.module('pccrd')
.controller('OrganizationCtrl',['$scope', '$routeParams', 'Organization', '$modal',
	function($scope, $routeParams, Organization, $modal){


		$scope.addLocation = function(service){

			var modalScope = $scope.$new();
			modalScope.organization = $scope.organization;
			modalScope.service = service

			$modal.open({
				templateUrl: 'public/app/js/views/location-add.html',
				controller: 'LocationAddCtrl',
				scope:modalScope
			});
		}

		Organization.get({slug:$routeParams.id}, 
			function(organization){
				$scope.message = "DONE"
				$scope.organization = organization
			}, function(){
				$scope.message = "FAILED"
			})
	}]);