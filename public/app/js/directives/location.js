angular.module('pccrd')
	.directive('location', [ function(){
		return {
			scope:{
				location: '=data'
			},
			templateUrl:'public/app/js/directives/location.html',
			controller: ['$scope', function($scope){
			}],
			restrict:'E'
		}
	}]);