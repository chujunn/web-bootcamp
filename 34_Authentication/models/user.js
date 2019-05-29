const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});
// add some passport method to userSchema
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);