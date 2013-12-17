var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var MemoryStore = require('connect').session.MemoryStore;

// configuration =================

app.configure(function(){
  app.set('view engine', 'jade');
  app.use(express.static(__dirname + '/public'));
  app.use(express.limit('1mb'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: "SocialNet secret key",
    store: new MemoryStore()
  }));
  mongoose.connect('mongodb://localhost/pccrd', function onMongooseError(err) {
    if (err) throw err;
  });
});

app.get('/', function(req, res){
  res.render('index.jade');
});

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");