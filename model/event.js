var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    title: String,
    from: String,
    to: String,
    when: String,
});

module.exports = mongoose.model('Event', eventSchema);