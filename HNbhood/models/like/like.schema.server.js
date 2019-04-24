var mongoose = require('mongoose');
var likeSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    event: {type: mongoose.Schema.Types.ObjectId, ref: 'eventModel'},
    date: Date
}, {collection: 'like'});
module.exports = likeSchema;

