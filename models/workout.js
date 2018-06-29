var mongoose = require("mongoose");

var workoutSchema = new mongoose.Schema({
	name:String,
	musclegroup:String,
	image:String,
	description:String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId, 
			ref: "User"
		},
		username: String
	},
	comments: [{

		type: mongoose.Schema.Types.ObjectId,
		ref:"Comment"
	}]


});

module.exports = mongoose.model("Workout", workoutSchema);