var mongoose = require('mongoose');
var eventSchema = mongoose.Schema({
    title: String,
    description: String,
    last_upd_date: Date,
    Org: {type: mongoose.Schema.Types.ObjectId, ref: 'orgModel'},
    image_path: String,
    tags: [{
        type: String
    }],
    venue: String,
    start_time: Date,
    end_time: Date,
    overview: String,
    likes: Number,
    reviews: Number,
}, {collection: 'event'});
module.exports = eventSchema;
