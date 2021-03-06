var express = require('express')
	,app = express()
	,organizations = require('./routes/organization')
	,locations = require('./routes/locations')
	,path = require('path')
	,mongoose = require('mongoose')

app.configure(function(){
	app.set('views', __dirname+"/views");
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(__dirname, 'public'));
	app.use(app.router);
});

var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } }
  mongoose.connect(process.env.MONGOLAB_URI, options)
}
connect();

// Error handler
mongoose.connection.on('error', function (err) {
  console.log(err)
});


require('./models/Organizations');
require('./models/Locations');

app.get('/api/locations', locations.findAll(mongoose.model('locations')));

app.get('/api/organizations', organizations.findAll(mongoose.model("organizations")));

app.get('/api/organizations/:slug', organizations.findBySlug(mongoose.model("organizations")));

app.put('/api/organizations/:slug', 
	organizations.updateOrganization(mongoose.model("organizations"), mongoose.model("locations")));

app.get('*', function(req, res){
	res.render('index');
});

var port = process.env.PORT 
app.listen(port);
console.log("Listening on " + port)