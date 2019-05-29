var express    = require("express");
var router     = express.Router({mergeParams: true});
var Campground = require("../models/campground");
// if we require a dictory, we will automatically require the index.js
var middleware = require("../middleware");

//  ===================
//  CAMPGROUND ROUTES
//  ===================

// show the campgrounds
router.get("/", function(req, res) {

    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    })
});

// Create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var imgUrl = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {
        name: name, 
        price: price,
        image: imgUrl, 
        description: desc,
        author: author
    };
    // create a new campground and save it to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// EDIT CAMPGROUND ROUTE
// only the author of the campground can edit!
router.get("/:id/edit", middleware.checkCampgroundOwnerShip, function(req, res) {
    var id = req.params.id;
    Campground.findById(id, function(err, foundCampground) {
        if (!foundCampground) {
            return res.status(400).send("Item not found.")
        }
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnerShip, function(req, res) {
    var id = req.params.id;
    var campground = req.body.campground;
    // find and update the correct campground
    Campground.updateOne({_id: id}, campground, function(err, updatedCampground){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // redirect to the show page
            res.redirect("/campgrounds/" + id);
        }
    });
});

// DELETE CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnerShip, function(req, res) {
    var id = req.params.id;
    // find the campground and delete it from the database
    Campground.deleteOne({_id: id}, function(err) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// SHOW more info about one campground
// 这个必须放在/new的后面，否则 /new 也会route到这里来 出现错误
router.get("/:id", function(req, res) {
    // find the campground with provided ID
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            if (!foundCampground) {
                return res.status(400).send("Item not found.")
            }
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

module.exports = router;