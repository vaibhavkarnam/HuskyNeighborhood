

var app = require('../../express');



    app.get('/api/HNbhood/user', findAllUsers);
    app.get('/api/HNbhood/user/:userId', findUserById);
    app.get('/api/HNbhood/user/username/:userName', findUserByUsername);
    app.post('/api/HNbhood/user', createUser);
    app.post('/api/HNbhood/register', registerUser);
    app.get('/api/HNbhood/profile', profile);
    app.post('/api/HNbhood/logout', logout);
    app.post('/api/HNbhood/login', login);
    app.get('/api/HNbhood/status', checkStatus);
    app.put('/api/HNbhood/user/update', updateUser);
    app.put('/api/HNbhood/user/:userId/update', updateUserById);
    app.delete('/api/HNbhood/user/:userId/delete', deleteUserById);
    app.get('/api/HNbhood/admin/status', checkAdminStatus);

    var userModel = require('../models/user/user.model.server');
    var likeModel = require('../models/like/like.model.server');
    var followModel = require('../models/follow/follow.model.server');
    var bookmarkModel = require('../models/bookmark/bookmark.model.server');
    var commentModel = require('../models/comment/comment.model.server');
    var activityModel = require('../models/activity/activity.model.server');




    function login(req, res) {
        var credentials = req.body;
        userModel
            .findUserByCred(credentials)
            .then(function (user) {
                if (user !== null) {
                    req.session['currentUser'] = user;
                }
                res.json(user);
            })
    }

    function updateUser(req, res) {
        var user = req.body;
        var u = req.session['currentUser']
        var id = u._id
        userModel.updateUser(id, user)
            .then(function () {
                req.session['currentUser'] = user;
                res.send(user);
            })
    }

    function updateUserById(req, res) {
        var user = req.body;
        var id = req.params['userId']
        userModel.updateUser(id, user)
            .then(function () {
                res.json(user);
            })
    }

    function deleteUserById(req, res) {
        var id = req.params['userId'];
        userModel.deleteUser(id)
            .then(function(){
                return bookmarkModel.deleteUser(id)
            })
            .then(function(){
                return likeModel.deleteUser(id)
            })
            .then(function(){
                return commentModel.deleteUser(id)
            })
            .then(function(){
                return followModel.deleteUser1(id)
            })
            .then(function(){
                return followModel.deleteUser2(id)
            })
            .then(function(){
                return activityModel.deleteUser1(id)
            })
            .then(function(){
                return activityModel.deleteUser2(id)
            })
            .then(function (user) {
                res.json(user);
            })
    }

    function checkStatus(req, res) {
        if (req.session['currentUser']) {
            res.json(true)
        }
        else res.json(false)
    }

    function checkAdminStatus(req, res) {
        if (req.session['currentUser'].role === 'admin') {
            res.send(true)
        }
        else res.send(false)
    }

    function logout(req, res) {
        req.session.destroy();
        res.sendStatus(200);
    }

    function findUserById(req, res) {
        var id = req.params['userId'];
        userModel.findUserById(id)
            .then(function (user) {
                res.json(user);
            })
    }

    function findUserByUsername(req, res) {
        var userName = req.params['userName'];
        userModel.findUserByUsername(userName)
            .then(function (user) {
                res.json(user);
            })
    }

    function profile(req, res) {
        res.send(req.session['currentUser']);
    }

    function registerUser(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.send(user);
            })
    }

    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(function (user) {
                res.send(user);
            })
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }

