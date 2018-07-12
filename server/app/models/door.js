// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let doorSchema = new Schema({
    name: String,
    description: String,
    address: String,
    startDate: Date,
    endDate: Date,
    username: String,
});
module.exports = mongoose.model('Door', doorSchema);
