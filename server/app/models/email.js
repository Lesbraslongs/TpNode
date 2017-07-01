// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let emailSchema = new Schema({
    firstname: String,
    name: String,
    domain: String
});
// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Email', emailSchema);