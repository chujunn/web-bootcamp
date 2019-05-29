var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
// tell express to serve the "public" directory
app.use(express.static("public"));
// tell express the view engine is ejs
// in this way we do not need to write ".ejs"
app.set("view engine", "ejs");

var friends = ["Tony", "Justin", "Suga", "Jimin"];


app.get("/", function(req, res) {
    // res.render("home.ejs");
    res.render("home");
});

app.post("/addfriend", function(req, res) {
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
})

app.get("/friends", function(req, res) {
    res.render("friends", {friends: friends});
});

app.get("/love/:thing", function(req, res) {
    var thing = req.params.thing;
    // res.render("love.ejs", {thingVar: thing});
    res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res) {
    var posts = [
        {title: "Post 1", author: "Suzy"},
        {title: "Post 2", author: "Amy"},
        {title: "Post 3", author: "Jimin"},
    ];
    // res.render("posts.ejs", {posts: posts});
    res.render("posts", {posts: posts});
})

app.listen(3000, function() {
    console.log("Server started!");
});