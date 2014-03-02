var express = require('express');
var app = express();
var organizations = require('./routes/organization');

app.get('/organizations', organizations.findAll);

app.get('/organizations/:id', organizations.findById);

app.listen(3000);
console.log("Listening on 3000")