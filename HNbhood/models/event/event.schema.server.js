var mongoose = require('mongoose');
var eventSchema = mongoose.Schema({
    title: String,
    poster_path: String,
    overview: String,
    likes: Number,
    reviews: Number,
}, {collection: 'event'});
module.exports = eventSchema;