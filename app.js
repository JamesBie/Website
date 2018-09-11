var express			=require("express"),
	app				= express(),
	bodyParser		=require("body-parser"),
	flash			=require("connect-flash"),
	mongoose		=require("mongoose"),
	passport		=require("passport"),
	LocalStrategy 	= require("passport-local"),
	methodOverride 	= require("method-override"),
	Workout			=require("./models/workout"),
	WrktComment		=require("./models/workoutcomment"),
	User			=require("./models/user")



//routes
var indexRoutes		= require ("./routes/index")
var exerciseRoutes	= require ("./routes/exercises")
var eventRoutes     = require ("./routes/events")
var contactRoutes   = require ("./routes/contact")

mongoose.connect("mongodb://localhost/crossfit");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());






// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "best exercises are here!!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user; //this passes the user to everyone
   res.locals.error = req.flash("error"); //if theres anythign in flash we'll have access to it in message
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/exercises", exerciseRoutes);
app.use("/events", eventRoutes);
app.use("/contact", contactRoutes);





app.listen(process.env.PORT || 3000, process.env.IP,function(){

	console.log("server started");
})





