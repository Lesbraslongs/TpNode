// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let userSchema = new Schema({
    login: String,
    password: String,
    admin: Boolean
});
module.exports = mongoose.model('User',userSchema);
