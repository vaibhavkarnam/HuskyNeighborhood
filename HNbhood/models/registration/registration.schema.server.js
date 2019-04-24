var mongoose = require('mongoose');
var registrationSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    event: {type: mongoose.Schema.Types.ObjectId, ref: 'eventModel'},
    date: Date
}, {collection: 'registration'});
module.exports = registrationSchema;

