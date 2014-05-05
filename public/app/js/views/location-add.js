angular.module('pccrd').controller('LocationAddCtrl', ['$scope', '$modalInstance', 
	function($scope, $modalInstance){

		$scope.locations = _.flatten(_.uniq(_.pluck($scope.organization.services, 'locations'), function(location){
			return location._id;
		}));

		$scope.location = {
			city: 'Little Rock',
			state:'AR'
		};

		$scope.save = function(){
			console.log("save")
			var service = _.find($scope.organization.services, function(org){return org.type = $scope.service});
			service.locations.push($scope.location);
			$scope.organization.$update(function(){
				console.log("success")
			}, function(){
				console.log("error")
			});
		}

		$scope.cancel = function(){
			console.log("cancel")
			$modalInstance.close();
		}

	}]);