var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/blog_demo', {useNewUrlParser: true});

var Post = require("./models/post");
var User = require("./models/user");



// User.create({
//     email: "chujunn@andrew.cmu.edu",
//     name: "chujunn"
// });

// Post.create({
//     title: "How to cook the best burger pt.3",
//     content: "You should find by yourself!"
// }, function(err, post) {
//     User.findOne({email: "chujunn@andrew.cmu.edu"}, function(err, foundUser) {
//         if (err) {
//             console.log(err);
//         } else {
//             foundUser.posts.push(post);
//             foundUser.save(function(err, data) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log(data);
//                 }
//             })
//         }
//     })
//     console.log(post);
// });

// User.findOne({email: "chujunn@andrew.cmu.edu"})
// .populate("posts")
// .exec(function(err, user) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });