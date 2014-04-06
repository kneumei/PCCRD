var express = require('express')
	,app = express()
	,organizations = require('./routes/organization')
	,path = require('path');

app.configure(function(){
	app.set('views', __dirname+"/views");
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(__dirname, 'public'));
	app.use(app.router);
});

app.get('/api/organizations', organizations.findAll);

app.get('/api/organizations/:slug', organizations.findBySlug);

app.get('*', function(req, res){
	res.render('index');
});

var port = process.env.PORT 
app.listen(port);
console.log("Listening on " + port)