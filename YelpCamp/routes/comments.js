var express    = require("express");
var router     = express.Router({mergeParams: true}); // important!
var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var middleware = require("../middleware");

//  ===================
//  COMMENTS ROUTES
//  ===================

// Comments
router.get("/new", middleware.isLoggedIn, function(req, res) {
    var id = req.params.id;
    Campground.findById(id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/new', {campground: campground});
        }
    })
});

// Comment create
router.post("/", middleware.isLoggedIn, function(req, res) {
    var id = req.params.id;
    var commentData = req.body.comment;
    Campground.findById(id, function(err, campground) {
        if (err) {
            req.flash("error", "Comment not found");
            res.redirect("/campground");
        } else {
            Comment.create(commentData, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully added comment!");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    var id = req.params.id;
    var comment_id = req.params.comment_id;
    Comment.findById(comment_id, function(err, foundComment) {
        if (err) {
            req.flash("error", "Comment not found");
            res.redirect("/campgrounds");
        } else {
            res.render("comments/edit", {comment: foundComment, id: id});
        }
    });
});

// UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    var id = req.params.id;
    var comment_id = req.params.comment_id;
    var newComment = req.body.comment;
    Comment.updateOne({_id: comment_id}, newComment, function(err, updatedComment) {
        if (err) {
            req.flash("error", "Something went wrong");
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted!");
            res.redirect("/campgrounds/" + id);
        }
    });
});

// DELETE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    var id = req.params.id;
    var comment_id = req.params.comment_id;
    Comment.deleteOne({_id: comment_id}, function(err) {
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + id);
        }
    });
});

module.exports = router;