var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var Comment=require("../models/comments");
var middleware=require("../middleware");


router.get("/campgrounds",function(req,res){
Campground.find({},function(err,allcampgrounds){
	if(err)
		{
			console.log(err);
		}else{
			res.render("campgrounds/index",{campgrounds:allcampgrounds,currentuser:req.user});	
		}
});
	
});
router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
	var name=req.body.name;
	var price=req.body.price;
	var image=req.body.image;
	var description=req.body.description;
	var author={
		id:req.user._id,
		username:req.user.username
	};
	var newcamp={name:name,price:price,image:image,description:description,author:author};
	Campground.create(newcamp,function(err,newlycreated){
		if(err)
			{
				console.log(err);
			}
		else{
			res.redirect("/campgrounds");	
		}
	});
	
});
router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
});
router.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground)
					   {
		if(err)
			{
				console.log(err);
			}
		else{
			res.render("campgrounds/show",{campground:foundcampground});
		}
	});
	
});



////edit route

router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findById(req.params.id,function(err,foundcampground){
	res.render("campgrounds/edit",{campground:foundcampground})	;
	});
	
});

router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedcampground){
		if(err){
			res.redirect("/campgrounds");
			
		}
		
		else{
			
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});


router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds");
		}
		else{
			res.redirect("/campgrounds")
		}
		
	});
	
	
	
});








module.exports=router;