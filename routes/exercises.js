var express 	= require("express");
var router 		= express.Router();
var Exercise	= require("../models/exercise");



// show all exercises
router.get("/", function(req,res){
	//get exercises from DB

	Exercise.find({}, function(err,allExercises){

		if (err){
			console.log(err);
		}else {
			res.render("exercises/index",{exercises:allExercises});
		}
	});
	
});


router.get("/new", function(req,res){


		res.render("exercises/new");
	

});


//create new exercises to database
router.post("/", function(req,res){

	var name = req.body.name;
    var image = req.body.image;
    var musclegroup = req.body.musclegroup;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newExercise = {name: name,musclegroup:musclegroup, image: image, description: desc, author:author}
    // Create a new exercise and save to DB
    Exercise.create(newExercise, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/exercises");
        }
    });


});

// EDIT EXERCISE ROUTE
router.get("/:id/edit", function(req, res){
    Exercise.findById(req.params.id, function(err, foundExercise){
        res.render("exercise/edit", {exercise: foundExercise});
    });
});

// UPDATE Exercise ROUTE
router.put("/:id", function(req, res){
    // find and update the correct campground
    Exercise.findByIdAndUpdate(req.params.id, req.body.exercise, function(err, updatedExercise){
       if(err){
           res.redirect("/exercises");
       } else {
           //redirect somewhere(show page)
           res.redirect("/exercises/" + req.params.id);
       }
    });
});

// DESTROY EXERCISE ROUTE
router.delete("/:id", function(req, res){
   Exercise.findByIdAndRemove(req.params.id, function(err){
      if(err){
      		req.flash("error", err.message);
          res.redirect("/exercises");
      } else {
      	req.flash("success", "Successfully deleted " + req.params.name);
          res.redirect("/exercises");
      }
   });
});



module.exports = router;