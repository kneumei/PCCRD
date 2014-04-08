var mongoose = require('mongoose')

var LocationSchema = new mongoose.Schema({
	name: {type: String, default: '', trim: true}
});

 mongoose.model('locations', LocationSchema)