var MongoClient = require('mongodb').MongoClient
	,Server = require('mongodb').Server

var conStr = process.env.MONGOLAB_URI
var db;
var Locations;

exports.findById = function(req, res){

}

exports.addLocation = function(req, res){
	var location = req.body;
	Locations.insert(location, {safe:true}, function(err, result){
		if(err){
			res.send({'error': 'could not insert location'});
		}else {
			res.send(result[0]);
		}
	});
}
