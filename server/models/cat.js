var mongoose = require('mongoose');

var catSchema = new mongoose.Schema({
    name: String
})

module.exports = mongoose.model('cats', catSchema);