var mongoose = require('mongoose');

// crating videos collection
var videosSchema = mongoose.Schema({
	name:{
		type: String,
		index: true
	},

	uploader:{
		type: String
	},

	uploadingDate:{
		type: String
	},

	likes:{
		type: String
	},
	views:{
		type: String
	}
});


var Videos = module.exports() = mongoose.model("videos", videosSchema);

