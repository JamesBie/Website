var express 	= require("express");
var router 		= express.Router();




// show all exercises
router.get("/", function(req,res){
	//get exercises from DB

	res.render("contact/index");
	
});





module.exports = router;