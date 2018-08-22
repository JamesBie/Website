var express		= require("express");
var router		= express.Router();
var passport	= require("passport");
var User		= require("../models/user");

router.get("/", function(req,res){

	res.render("landing");

});

//++++++++++++++++++++++++++++++++++++++++++++
//+				Comment Routes				 +
//++++++++++++++++++++++++++++++++++++++++++++

router.get("/homepage",function(req,res){

	res.render("homepage");
});

//++++++++++++++++++++++++++++++++++++++++++++
//+				Comment Routes				 +
//++++++++++++++++++++++++++++++++++++++++++++


//Authorization routes

router.get("/register",function(req,res){
	res.render("register");


});

//handle registration logic
router.post("/register",function(req,res){
	var newUser = new User({username: req.body.username , image :"none", email: req.body.email, role: "member" });
	console.log(req.body);
	User.register(newUser,
		
		req.body.password, 
		function (err, user){
		if (err){
			req.flash("error", err.message);
			return res.redirect("register"); //short circuits out of the function and redirects us to register page
		} else{
			passport.authenticate("local")(req, res, function (){
				req.flash("success", "Successfully registered " + user.username);
				res.redirect("/homepage");


			});
		}
	});


});

//showing login page
router.get("/login",function(req,res){
	res.render("login");


});

router.post("/login",passport.authenticate("local",
		{
			successRedirect: "/homepage",
			failureRedirect: "/login"

		}

	) ,function(req,res){

});



//logout from navbar
router.get("/logout", function(req,res){
	{
		req.logout();
		req.flash("success", "Logged you out!");
		res.redirect("/homepage");

	}


});


module.exports = router;