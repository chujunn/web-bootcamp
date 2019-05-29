var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "金敏圭", 
        image: "http://wx1.sinaimg.cn/large/6b6c3dbcly1g359en2r9bj20qe0gpq7k.jpg",
        description: "金敏圭起床练舞了吗？"
    },
    {
        name: "张元英", 
        image: "https://wx3.sinaimg.cn/mw690/007CINDnly1g3dreqls71j322415okhx.jpg",
        description: "top top top!"
    },
    {
        name: "裴秀智", 
        image: "https://wx3.sinaimg.cn/mw690/6b6c3dbcly1fkce7cne8jj20k00p00wa.jpg",
        description: "国民初恋"
    },
    {
        name: "山崎贤人", 
        image: "https://ww2.sinaimg.cn/mw690/0067NaxYjw1evfvzfq1sgj30fk0ae750.jpg",
        description: "国宝级美男Kentooo"
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.deleteMany({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
            //  // wait all removes, then add a few campgrounds
            // data.forEach(function(seed){
            //     Campground.create(seed, function(err, campground){
            //         if(err){
            //             console.log(err)
            //         } else {
            //             console.log("added a campground");
            //             //create a comment on each campground
            //             Comment.create(
            //                 {
            //                     text: "This place is great, but I wish there was internet",
            //                     author: "Homer"
            //                 }, function(err, comment){
            //                     if(err){
            //                         console.log(err);
            //                     } else {
            //                         campground.comments.push(comment);
            //                         campground.save();
            //                         console.log("Created new comment");
            //                     }
            //                 }
            //             );
            //         }
            //     });
            // });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;