var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    title: String,
    from: Date,
    to: Date,
    where: String,
});

module.exports = mongoose.model('Event', eventSchema);