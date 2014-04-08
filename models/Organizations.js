var mongoose = require('mongoose')

var OrganizationSchema = new mongoose.Schema({
	name: {type: String, default: '', trim: true},
	slug: {type: String, default: '', trime: true},
	services:[{
		type: {type: String, default: '', trim: true},
		description: {type: String, default: '', trim: true},
		locations: [{type: mongoose.Schema.Types.ObjectId, ref : 'locations'}]
	}]
});

 mongoose.model('organizations', OrganizationSchema)