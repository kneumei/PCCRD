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

exports.addOrganization =  function(db){
	return function(req, res){
		var organization = req.body;
		db.collection('organizations').insert(organization, {safe:true}, function(err, result){
			if(err){
				res.send({'error': 'an error has occurred'});
			}else{
				res.send(result[0]);
			}
		});
	}
}
