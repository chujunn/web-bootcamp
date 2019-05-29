const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const app = express();


mongoose.connect("mongodb://localhost/demo", {useNewUrlParser: true});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function() {
    console.log("Welcome to this app!");
});