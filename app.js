//PACKAGES
var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    passport            = require("passport"),
    passportLocal       = require("passport-local"),
    passportMongoose    = require("passport-local-mongoose"),
    expressSession      = require("express-session"),
    methodOverride      = require("method-override"),
    flash               = require("connect-flash"),
    //MODELS
    Campground          = require("./models/campground"),
    Comment             = require("./models/comment"),
    User                = require("./models/user"),
    //SEED
    seedDB              = require("./seeds");

//ROUTES
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");

// mongoose.connect("mongodb://localhost/yelp_camp");
var url = process.env.DataBaseURL || "mongodb://localhost/yelp_camp";
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("bower_components"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

//PASSPORT CONFIG
app.use(expressSession({
    secret: "NO SECRET HERE",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//run on every route
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

var campGrounds = [
    {name: "Snowdonia National Park", img: "https://drscdn.500px.org/photo/105213629/q%3D80_m%3D2000/8822a36b1e87fae1e499f7a3ce6118df"},
    {name: "Huayhuash Mountain Ranges", img: "https://drscdn.500px.org/photo/115753963/q%3D80_m%3D2000/3a8694e22daaf3063dccbe6238ac13ee"},
    {name: "Kayak Camp", img: "https://drscdn.500px.org/photo/71770819/q%3D80_m%3D2000/a43375bd06214a4a327ba8810d5fd20e"},
    {name: "Snowdonia National Park", img: "https://drscdn.500px.org/photo/105213629/q%3D80_m%3D2000/8822a36b1e87fae1e499f7a3ce6118df"},
    {name: "Huayhuash Mountain Ranges", img: "https://drscdn.500px.org/photo/115753963/q%3D80_m%3D2000/3a8694e22daaf3063dccbe6238ac13ee"},
    {name: "Kayak Camp", img: "https://drscdn.500px.org/photo/71770819/q%3D80_m%3D2000/a43375bd06214a4a327ba8810d5fd20e"},
];

app.listen(process.env.PORT || 3000, function(){
    console.log("SERVER STARTED");
});
