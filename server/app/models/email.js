// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let emailSchema = new Schema({
    firstname: String,
    name: String,
    domain: String
});
module.exports = mongoose.model('Email', emailSchema);