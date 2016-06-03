var Campground  = require("../models/campground"),
    Comment     = require("../models/comment");

var middlewareObj = {};

middlewareObj.isCampgroundOwner = function(req, res, next){
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(error, foundCampGround){
            if (error) {
                req.flash("error", "CAMPGROUND NOT FOUND!");
                console.log(error);
                res.redirect("back");
            }
            else {
                if (foundCampGround.author.id.equals(req.user._id)) {
                    return next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    //Redirect to previous page. Built-in
                    res.redirect("back");
                }
            }
        });
    } else {
        console.log("You need to be logged in");
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.isCommentOwner = function(req, res, next){
    if (req.isAuthenticated()) {
        Comment.findById(req.params.commentId, function(error, foundComment){
            if (error) {
                req.flash("error", "Comment not found!");
                console.log(error);
                res.redirect("back");
            }
            else {
                if (foundComment.author.id.equals(req.user._id)) {
                    return next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    //Redirect to previous page. Built-in
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        console.log("You need to be logged in");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.session.returnTo = req.path;
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
};

module.exports = middlewareObj;
