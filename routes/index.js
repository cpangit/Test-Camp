var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment"),
    passport    = require("passport"),
    User        = require("../models/user");

var express = require("express"),
    router  = express.Router();

router.get("/", function(req, res){
    res.render("landing");
});

//AUTH ROUTES
//REGISTER
router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(error, user){
        if (error) {
            req.flash("error", error.message);
            console.log(error);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//LOGIN
router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local",
    {
        failureRedirect: "/login"
    }) ,function(req, res){
        if (req.session.returnTo) {
            req.flash("success", "Welcome back!");
            res.redirect(req.session.returnTo);
            console.log(req.session.returnTo);
            delete req.session.returnTo;
        } else {
            req.flash("success", "Welcome back!");
            res.redirect("/campgrounds");
        }
});

//LOGOUT
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "LOGGED OUT!");
    res.redirect("/campgrounds");
});



module.exports = router;
