var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground"),
    middleWare  = require("../middleware");

router.get("/campgrounds", function(req, res){
    Campground.find({}, function(error, allCampGrounds){
        if(error)
            console.log(error);
        else {
            res.render("campgrounds/index", {campGrounds:allCampGrounds});
        }
    });
});

router.post("/campgrounds", middleWare.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampGround = {name: name, img: image, desc: desc, author: author};
    Campground.create(newCampGround, function(error, newCamp){
        if(error){
            req.flash("error", error.message);
            console.log(error);
        }
        else {
            res.redirect("/campgrounds");
        }
    });
});

router.get("/campgrounds/new", middleWare.isLoggedIn ,function(req, res){
    res.render("campgrounds/new");
});

//SHOW Route
router.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampGround){
        if(error){
            req.flash("error", error.message);
            console.log(error);
        }
        else{
            // console.log(foundCampGround);
            res.render("campgrounds/show", {campgrounds: foundCampGround});
        }
    });
});

//UPDATE ROUTES
router.get("/campgrounds/:id/edit", middleWare.isCampgroundOwner, function(req,res){
    Campground.findById(req.params.id, function(error, foundCampGround){
        res.render("campgrounds/edit", {campground: foundCampGround});
    });
});

router.put("/campgrounds/:id", middleWare.isCampgroundOwner, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(error, updatedCampground){
        if (error) {
            req.flash("error", error.message);
            console.log(error);
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Comment successfully edited!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DELETE ROUTES
router.delete("/campgrounds/:id", middleWare.isCampgroundOwner, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(error){
        if (error) {
            req.flash("error", error.message);
            console.log(error);
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground deleted!");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;
