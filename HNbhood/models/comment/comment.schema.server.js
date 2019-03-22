var mongoose = require('mongoose');
var commentSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    event: {type: mongoose.Schema.Types.ObjectId, ref: 'eventModel'},
    comment: String,
    visibility: String,
    recommended: Boolean,
    date: String,
}, {collection: 'comment'});
module.exports = commentSchema;

