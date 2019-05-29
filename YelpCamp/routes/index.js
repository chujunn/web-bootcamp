var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var User     = require("../models/user");

// AUTH Routes

// root route
router.get("/", function(req, res) {
    res.render("landing");
});

// show register form
router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var newUser = new User({username: username})
    User.register(newUser, password, function(err, user) {
        if (err) {
            req.flash("error", err.message);            
            res.render("register");
        } else {
            // Everything is Ok, then redirect to campground
            passport.authenticate("local")(req, res, function() {
                req.flash("success", "Welcome to YelpCamp" + user.username);            
                res.redirect("/campgrounds");
            });
        }
    });
});

// SHOW LOGIN form
router.get("/login", function(req, res) {
    res.render("login");
});

// router.post(path, middleware, callback)
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});

// LOGOUT
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

module.exports = router;