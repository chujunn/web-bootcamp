var bodyParser            = require("body-parser");
var mongoose              = require("mongoose");
var passport              = require("passport");
var LocalStrategy         = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var express               = require("express");
var User                  = require("./models/user");

mongoose.connect("mongodb://localhost/auth_demo_app", {useNewUrlParser: true});
var app = express();
app.set("view engine", "ejs");
app.use(require("express-session")({
    secret: "I like you",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res) {
    res.render("secret");
});
// Show sign up form
app.get("/register", function(req, res) {
    res.render("register");
});
// Handing user sign up
app.post("/register", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    // not save the password to the database
    User.register(new User({username: username}), password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        } 
        passport.authenticate("local")(req, res, function() {
            res.redirect("/secret");
        });
    });
});
// LOGIN ROUTES
app.get("/login", function(req, res) {
    res.render("login");
});

// middleware - run before the callback function
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res) {
});

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } 
    res.redirect("/login");
}


app.listen(3000, function() {
    console.log("App started.....");
});