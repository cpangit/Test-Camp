var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        img:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a leo non elit mollis iaculis in sed quam. Nullam ullamcorper tortor sed leo interdum tempor. Phasellus egestas nulla vitae mattis hendrerit. Nunc et mi massa. Morbi ac pellentesque justo, eu lobortis enim. Praesent placerat ornare efficitur. Etiam porta placerat laoreet. Morbi a tincidunt orci. In suscipit eu mauris eu sagittis. Nulla dictum condimentum magna, tristique fringilla arcu ultrices eget."
    },
    {
        name: "Desert Mesa",
        img:"https://farm3.staticflickr.com/2947/15215548990_efc53d32b6.jpg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a leo non elit mollis iaculis in sed quam. Nullam ullamcorper tortor sed leo interdum tempor. Phasellus egestas nulla vitae mattis hendrerit. Nunc et mi massa. Morbi ac pellentesque justo, eu lobortis enim. Praesent placerat ornare efficitur. Etiam porta placerat laoreet. Morbi a tincidunt orci. In suscipit eu mauris eu sagittis. Nulla dictum condimentum magna, tristique fringilla arcu ultrices eget."
    },
    {
        name: "Canyon Floor",
        img:"https://farm9.staticflickr.com/8572/16034357695_5ca6214f59.jpg",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a leo non elit mollis iaculis in sed quam. Nullam ullamcorper tortor sed leo interdum tempor. Phasellus egestas nulla vitae mattis hendrerit. Nunc et mi massa. Morbi ac pellentesque justo, eu lobortis enim. Praesent placerat ornare efficitur. Etiam porta placerat laoreet. Morbi a tincidunt orci. In suscipit eu mauris eu sagittis. Nulla dictum condimentum magna, tristique fringilla arcu ultrices eget."
    },
];

function seedDB() {
    Campground.remove({}, function(error){
        if (error) {
            console.log(error);
        }
        else {
            console.log("removed campgrounds");
        }
        data.forEach(function(seed){
            Campground.create(seed, function(error, campground){
                if (error) {
                    console.log(error);
                }
                else {
                    console.log("added a campground");
                    Comment.create(
                        {
                            text: "This place is great!",
                            author: "Admin"
                        }, function(error, comment){
                            if (error) {
                                console.log(error);
                            }
                            else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment");
                            }
                        });
                }
            });
        });
    });
}

module.exports = seedDB;
