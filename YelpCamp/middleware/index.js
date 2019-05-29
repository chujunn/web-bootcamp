var Campground = require("../models/campground");
var Comment = require("../models/comment");
// all the middleware goes here
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

middlewareObj.checkCampgroundOwnerShip = function(req, res, next) {
    var id = req.params.id;
    // is user logged in? 
    if (req.isAuthenticated()) {
        Campground.findById(id, function(err, foundCampground) {
            if (err) {
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                if (!foundCampground) {
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }
                // is current user the author of the campground?
                var loggedUser = req.user._id;   // String
                var author = foundCampground.author.id;   // mongoose object
                if (author.equals(loggedUser)) {
                    return next();
                } else {
                    req.flash("error", "You don't have the permission");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");  // 返回之前的page
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        var comment_id = req.params.comment_id;
        Comment.findById(comment_id, function(err, foundComment) {
            if (err) {
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                var loggedUser = req.user._id;
                var author = foundComment.author.id;
                if (author.equals(loggedUser)) {
                    return next();
                } else {
                    req.flash("error", "You don't have the permission");
                    res.redirect("back");
                }
            }
        })
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}


module.exports = middlewareObj;