angular.module('pccrd')
	.factory("Organization", ["$resource", function($resource){
		return $resource(
				'/api/organizations/:slug',
				{slug:'@slug'},
				{update:{method:'PUT'}}
			);
	}]);