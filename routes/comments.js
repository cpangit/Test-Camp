var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment"),
    middleWare  = require("../middleware");

router.get("/campgrounds/:id/comments/new", middleWare.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(error, foundCampGround){
        if (error) {
            console.log(error);
        }
        else {
            res.render("comments/new", {campground: foundCampGround});
        }
    });
});

router.post("/campgrounds/:id/comments", middleWare.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(error, foundCampGround){
        if (error) {
            console.log(error);
            res.redirect("/campgrounds");
        }
        else {
            Comment.create(req.body.comment, function(error, comment){
                if (error) {
                    req.flash("error", "Something went wrong!");
                    console.log(error);
                }
                else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundCampGround.comments.push(comment);
                    foundCampGround.save();
                    req.flash("success", "Successfully added comment!");
                    res.redirect("/campgrounds/" + foundCampGround._id);
                }
            });
        }
    });
});

//EDIT COMMENTS
router.get("/campgrounds/:id/comments/:commentId/edit", middleWare.isCommentOwner, function(req, res){
    Comment.findById(req.params.commentId, function(error, foundComment){
        if (error) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {campgroundId: req.params.id, comment: foundComment});
        }
    });
});

router.put("/campgrounds/:id/comments/:commentId", middleWare.isCommentOwner, function(req, res){
    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(error, updatedComment){
        if (error) {
            console.log(error);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DELETE ROUTES
router.delete("/campgrounds/:id/comments/:commentId", middleWare.isCommentOwner, function(req, res){
    Comment.findByIdAndRemove(req.params.commentId, function(error){
        if (error) {
            console.log(error);
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;
