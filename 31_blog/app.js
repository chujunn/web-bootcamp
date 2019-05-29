const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

// App Config
mongoose.connect("mongodb://localhost/blog_app", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// Mongoose/Model Config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Restful Routes
app.get("/", function(req, res) {
    res.redirect("/blogs");
});

// Index Route
app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});
// New Route
app.get("/blogs/new", function(req, res) {
    res.render("new");
});

// Create Route
app.post("/blogs", function(req, res) {
    var blog = req.body.blog;
    // 过滤掉body中部分内容(比如script)
    blog.body = req.sanitize(blog.body);
    Blog.create(blog, function(err, newBlog) {
        if (err) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

// SHOW Route
app.get("/blogs/:id", function(req, res) {
    var id = req.params.id;
    Blog.findById(id, function(err, foundBlog) {
        if (err) {
            res.redirect("/blogs")
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

// EDIT Route
app.get("/blogs/:id/edit", function(req, res) {
    var id = req.params.id;
    Blog.findById(id, function(err, foundBlog) {
        if (err) {
            res.redirect("/blogs")
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

// UPDATE Route
app.put("/blogs/:id", function(req, res) {
    var id = req.params.id;
    var newData = req.body.blog;
    // 过滤掉body中部分内容(比如script)
    newData.body = req.sanitize(newData.body);
    Blog.updateOne({_id: id}, newData, function(err, updatedBlog) {
        if (err) {
            res.redirect("/blogs")
        } else {
            res.redirect("/blogs/" + id);
        }
    })
})

// DESTROY Route
app.delete("/blogs/:id", function(req, res) {
    var id = req.params.id;
    Blog.deleteOne({_id: id}, function(err) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

app.listen(3000, function() {
    console.log("Welcome to blog app!");
});