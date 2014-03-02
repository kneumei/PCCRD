var MongoClient = require('mongodb').MongoClient
	,Server = require('mongodb').Server

var conStr = "mongodb://pccrd:sufficientgrounds@ds033449.mongolab.com:33449/pccrd"
var db;
var orgColl;

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
	orgColl.find().toArray(function(err, items){
		res.send(items);
	});
};

exports.findById = function(req,res){
	
	collection.find({id:req.params.Id}).toArray(function(err, item){
		res.send(item);
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