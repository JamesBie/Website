var express		=require("express"),
	app			= express(),
	bodyParser	=require("body-parser"),
	flash		=require("connect-flash"),
	mongoose	=require("mongoose"),
	passport	=require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	Workout		=require("./models/workout"),
	WrktComment		=require("./models/workoutcomment"),
	User		=require("./models/user")



	app.use(bodyParser.urlencoded({extended:true}));
	app.set("view engine", "ejs");
	app.use(express.static(__dirname + "/public"));
	app.use(methodOverride("_method"));
	app.use(flash());


	app.listen(process.env.PORT || 3000, process.env.IP,function(){

		console.log("server started");
	})



