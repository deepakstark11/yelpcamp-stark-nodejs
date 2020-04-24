var express=require("express");
var app=express();
var bodyparser=require("body-parser");
var mongoose=require("mongoose");
var flash=require("connect-flash");
var passport=require("passport");
var methodOverride=require("method-override");
var LocalStrategy=require("passport-local");
var Campground=require("./models/campground");
var seedDB=require("./seed");
var User=require("./models/user")
var Comment=require("./models/comments");
var commentRoutes=require("./routes/comments");
var campgroundRoutes=require("./routes/campgrounds");
var indexRoutes=require("./routes/index");

mongoose.connect("mongodb+srv://deepakstark11:deepak@london123@cluster0-ijq6g.mongodb.net/yelpcamp?retryWrites=true&w=majority",{ useNewUrlParser: true ,useUnifiedTopology: true});

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine","ejs");
//seedDB();


app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
	res.locals.currentuser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
		
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


/*Campground.create({name:"Granite Hill", image:"https://pixabay.com/get/54e5dc474355a914f1dc84609620367d1c3ed9e04e507441722f72dd9444cd_340.jpg",
description:"This is a beautiful granite hill!! It has lot of adventures"},function(err,campground){
	if(err){
		console.log(err);
	}
	else{
		console.log("newly created campground");
		console.log(campground);
	}
});*/


	/*var campgrounds=[
		{name:"Salmon Creek" ,image:"https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e507441722f72dd9444cd_340.jpg"},
		{name:"Granite Hill", image:"https://pixabay.com/get/54e5dc474355a914f1dc84609620367d1c3ed9e04e507441722f72dd9444cd_340.jpg"},
		{name:"Mountain Goat's Rest", image:"https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e507441722f72dd9444cd_340.jpg"},
		{name:"Mountain Goat's Rest", image:"https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e507441722f72dd9444cd_340.jpg"},
		{name:"Mountain Goat's Rest", image:"https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e507441722f72dd9444cd_340.jpg"},
		{name:"Mountain Goat's Rest", image:"https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e507441722f72dd9444cd_340.jpg"},
		{name:"Mountain Goat's Rest", image:"https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e507441722f72dd9444cd_340.jpg"}
		
	];*/
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);






app.listen(3000,function(){
	console.log("we are running on port 3000");
});