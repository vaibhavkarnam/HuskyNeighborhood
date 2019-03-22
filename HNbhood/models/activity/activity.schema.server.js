var mongoose = require('mongoose');
var activitySchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    user2: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    event: {type: mongoose.Schema.Types.ObjectId, ref: 'eventModel'},
    type: String,
    date: Date
}, {collection: 'activity'});
module.exports = activitySchema;

