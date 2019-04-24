var mongoose = require('mongoose');
var bookmarkSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    event: {type: mongoose.Schema.Types.ObjectId, ref: 'eventModel'},
    date: Date
}, {collection: 'bookmark'});
module.exports = bookmarkSchema;

