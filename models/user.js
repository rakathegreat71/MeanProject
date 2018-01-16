var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


var userSchema = mongoose.Schema({
	username:{
		type: String,
		index: true
	},

	password:{
		type: String
	},

	email:{
		type: String
	},

	name:{
		type: String
	}
});

var User = module.exports = mongoose.model("user", userSchema);

module.exports.addUser = function (newUser, cb) {
	var bcrypt = require('bcryptjs');
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password = hash;
        newUser.save(cb);
    });
	});
	// body...
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};

	User.findOne(query, callback)
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
		if(err) throw err;
		console.log(isMatch);
		callback(null, isMatch);
	})
}

module.exports.getUserById = function (id, callback) {
		User.findById(id, callback);

}