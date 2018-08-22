var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema ({

	username: String,
	password: String,
 	role: {type: String, default: 'member'},    //admin or member . might add more later
 	email: {type:String, default: 'none'},
	image: {type:String, default: 'none'}
// }, {timestamps: true
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model ("User", UserSchema);