var _ = require("lodash-node")


exports.findAll = function(Locations){
	return function(req, res){
		Locations.find({}, function(err, locations){
			if(err || !locations){
				res.status(404).send("not found");
			}else{
				res.send(locations);
			}
		});
	};
};