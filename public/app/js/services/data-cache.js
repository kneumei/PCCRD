angular.module('pccrd').factory('dataCache', [ '$q',  'Organization', 'Location', 
	function($q, Organization, Location){
		var locations = null;
		var organizations = null;

		var getOrganizations = function(){
			var deferred = $q.defer();

			if(organizations){
				deferred.resolve(organizations);
			}

			Organization.query(function(result){
				organizations = result;

				_.forEach(organizations, function(organization){
					_.forEach(organization.services, function(service){
						var locationIds = angular.copy(service.locations);
						service.locations.length = 0;
						_.forEach(locationIds, function(locationId){
							getLocation(locationId).then(function(locationData){
								service.locations.push(locationData);
							});
						})
					})
				});

				deferred.resolve(organizations);
			}, function(error){
				deferred.reject(error);
			})

			return deferred.promise;
		}

		var getLocations = function(){
			var deferred = $q.defer();

			if(locations){
				deferred.resolve(locations);
			}

			Location.query(function(result){
				locations = result;
				deferred.resolve(locations);
			}, function(error){
				deferred.reject(error);
			})

			return deferred.promise;
		}

		var getLocation = function(id){
			var deferred = $q.defer();
			getLocations().then(function(locations){
				var foundLocation = _.find(locations, function(location){
					return location._id == id;
				});
				deferred.resolve(foundLocation);
			}, function(error){
				deferred.reject(error);
			});
			return deferred.promise;
		}

		var getOrganization = function(slug){
			var deferred = $q.defer();
			getOrganizations().then(function(organizations){
				var foundOrganization = _.find(organizations, function(organization){
					return organization.slug == slug;
				});
				deferred.resolve(foundOrganization);
			}, function(error){
				deferred.reject(error);
			});
			return deferred.promise;
		}

		return{
			getOrganizations: getOrganizations,
			getLocations: getLocations,
			getLocation: getLocation,
			getOrganization: getOrganization
		}
	}]);