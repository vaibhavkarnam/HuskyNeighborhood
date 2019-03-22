var mongoose = require('mongoose');

var orgSchema = mongoose.Schema({
    orgname: String,
    password: String,
    img_path: String,
    role: String,
    email: String,
    phone: String,
    address: String,
    followers: Number,
    followings: Number
},
    {collection: 'org'});

module.exports = orgSchema;