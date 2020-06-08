# Yelpcamp-Stark 

Yelcamp is a nodeJs web application that focus on CRUD using express. It allows users sign up and add pictures of campgrouds to a timeline so people can view and comment on them. Anyone can and view all the campgrounds, but you must sign up/login to add a new campground, and add comments.

### Link to Application: https://polar-retreat-95806.herokuapp.com/

## Initial Setup: 7 RESTful routes

* campgrounds   :	**/campgrounds**	              GET	    List all campgrounds

* newCampground :	**/campgrounds/newCampground**	  GET	    Show new campground form

* Create	      : **/campgrounds**	              POST     Create a new campground, then redirect somewhere

* Show	      : **/campgrounds/:id**	          GET	    Show info about one specific Campground

* Edit	      : **/campgrounds/:id/edit**	      GET	    Show edit form for one campground

* Update	      : **/campgrounds/:id**	          PUT	    Update a particular campground

* Destroy	      : **/campgrounds/:id**	          DELETE	Delete a particular campground

## Comment restful

* new	   :  **campgrounds/:id/comments/new**	              GET	show comment form

* Create :  **campgrounds/:id/comments**                POST	show campground with comments

* edit	 : **campgrounds/:id/comments/:comment_id/edit**	GET	EDIT your own comment


## DBMS

1. MongoDB
1. mongoose for schema and Model
1. mongoAtlas

## Each Campground has:

1. Name
1. Image
1. Description
1. author: {id: { }, username: String},
1. comments: [{ type: ref: }],

## Each User has:

* username
* password

## Each Comment has:

text: , author: { id: { type:, ref: }, username: String }

## Front End

* Bootstrap 4.3.1 (navbar, forms, button, alert)
* HTML, CSS, JavaScript

## Backend

* NodeJs
* mongoose
* express
* express Sanitizer
* express-Session
* body-parser
* ejs

## Authentication/Authorization

* passport
* passport
* passport Local
* passport local Mongoose
* middlewares

# Sever: run "node app.js"


