var MongoClient = require('mongodb').MongoClient
	,Server = require('mongodb').Server
	,config = require('../config/mongo.db.test.js')

var conStr = "mongodb://"+config.user+":"+config.pass+"@"+config.server+":"+config.port+"/pccrd"
var db;
var orgColl;

console.log(conStr);

MongoClient.connect(conStr, function(err, database){
	
	db =database;
	db.collection('organizations', function(err, collection){
		orgColl = collection;
		if(err){
				populateDb();
			}

	}); 

});


exports.findAll = function(req, res){
	orgColl.aggregate([
		{$unwind: "$locations"},
		{$unwind: "$locations.services"},
		{$group:{_id: 
			{ slug: "$slug", name: "$name"},
			services: {$addToSet: "$locations.services"}}
		},
		{$project: { 
			_id: 0,
			slug: "$_id.slug",
			name: "$_id.name",
			services: 1
		}}
		], function(err, result){
			res.send(result);
		});

};

exports.findBySlug = function(req,res){
	orgColl.findOne({slug:req.params.slug}, function(err, item){
		if(err || !item){
			res.status(404).send();
		}else{
			res.send(item);	
		}
		
	});
}

exports.addOrganization = function(req, res){
	var organization = req.body;
	orgColl.insert(organization, {safe:true}, function(err, result){
		if(err){
			res.send({'error': 'an error has occurred'});
		}else{
			console.log('success');
			res.send(result[0]);
		}
	});
}

var populateDb = function(){
	var organizations =  [
		{
			name:"Salvation Army",
			locations:[
			{	
				address:{
					street: "101 Poplar",
					city: "Little Rock",
					State: "AR",
					Zip: "72205"
				},
				hours:[
					{days:["m", "t", "w"], start: 9, end: 16},
					{days:["r", "f", "s"], start: 10, end:12}
				],
				services:["food", "clothing", "shelter"],
				comment: "Main distribution Center",
				phone: "455-4321"
			}],
			contact:{
				Name: "Joe Schmoe",
				Title: "Regional Director",
				Phone: "455-1234"
			},
			
		},
		{
			name:"Helping Hand",
			locations:[
			{
				address:{
					street: "202 Spruce",
					city: "Little Rock",
					State: "Ar",
					Zip: "72206"
				},
				hours:[
					{days:["s"], start:9, end: 16 }
				]
			}
			]
		}
	];
	orgColl.insert(organizations, {safe:true}, function(err, result){});
}