var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    img_path: String,
    role: String,
    interests: [{
            type: String
        }],
    email: String,
    bio: String,
    specialization: String,
    facebook: String,
    phone: String,
    address: String,
    gender: String,
    dateB: String,
    followers: Number,
    followings: Number
},
    {collection: 'user'});

module.exports = userSchema;
