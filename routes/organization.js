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

exports.updateOrganization = function(Organization){
	return function(req, res){
		console.log("here!")
			console.log(req.body)
		Organization.update(req.body, {upsert: true}, function(err){
			if(err){
				res.status(500).send("could not insert");
			}else{
				res.send(202)
			}
		});
	}
}
