angular.module('pccrd')
.controller('OrganizationCtrl',['$scope', '$routeParams', 'dataCache', '$modal',
	function($scope, $routeParams, dataCache, $modal){


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

		dataCache.getOrganization($routeParams.id).then( 
			function(organization){
				$scope.message = "DONE"
				$scope.organization = organization
			}, function(){
				$scope.message = "FAILED"
			});
	}]);