var mongoose = require("mongoose");

// SCHEMA SETUP
var campGroundSchema = new mongoose.Schema({
    name: String,
    img: String,
    desc: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
});

var Campground = mongoose.model("Campground", campGroundSchema);

module.exports = Campground;
