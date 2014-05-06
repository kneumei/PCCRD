var _ = require("lodash-node")


exports.findAll = function(Organization){
	return function(req, res){
		Organization.find({}, function(err, organizations){
			if(err || !organizations){
				res.status(404).send("not found");
			}else{
				res.send(organizations);
			}
		});
	};
};

exports.findBySlug = function(Organization){
	return function(req, res){
		var slug = req.params.slug;
		Organization.findOne({slug: slug}).populate('services.locations').exec(function(err, organization){
			if(err || !organization){
				res.status(404).send("not found");
			}else{
				res.send(organization);
			}
		});
	}
}

exports.updateOrganization = function(Organization, Location){
	return function(req, res){

		var newOrganization = req.body;
		var existingOrganization = null;
		Organization.findOne({slug:req.params.slug}, function(err, organization){
			if(err || !organization){
				res.status(404).send("not found");
				return;
			}
			existingOrganization = organization;
		});

		_.each(newOrganization.services, function(service){
			_.each(service.location, function(location){
				
			});
		});

		Organization.update(req.body, {upsert: true}, function(err){
			if(err){
				res.status(500).send("could not insert");
			}else{
				res.send(202)
			}
		});
	}
}
