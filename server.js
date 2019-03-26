var app = require('./express');
var express = app.express;

var cookieParser = require('cookie-parser');
var session      = require('express-session');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "http://localhost:4200");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "https://husky-neighborhood.herokuapp.com");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.set('view engine', 'ejs');
// require("./utilities/filelist");

app.use(cookieParser());
app.use(session({ secret: "put some text here" }));

app.use(express.static(__dirname + '/public'));

require ('./HNbhood/app');
require("./test/app");

app.listen(process.env.PORT ||3000);
