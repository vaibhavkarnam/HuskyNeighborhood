var app = require('../express');
var q = require('q');

var connectionString = 'mongodb://127.0.0.1:27017/test';
if(process.env.MLAB_USERNAME_WEBDEV_NEW) {
    var username = "admin";
    var password = "admin";
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds137139.mlab.com:37139/heroku_d64prf40';
}

var mongoose = require("mongoose");
mongoose.connect(connectionString, {
    useMongoClient: true,
    /* other options */
});
mongoose.Promise = q.Promise;
