angular.module('pccrd')
	.factory("Location", ["$resource", function($resource){
		return $resource(
				'/api/locations/:id',
				{id:'@id'},
				{update:{method:'PUT'}}
			);
	}]);