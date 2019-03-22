var app = require('../../express');

app.post('/api/HNbhood/follow/following/:userId', userFollows);
app.get('/api/HNbhood/follow/following/:userId', checkFollowing);
app.delete('/api/HNbhood/follow/following/:userId', userUnfollows);
app.get('/api/HNbhood/follow/user/:userId/following', findAllFollowings)
app.get('/api/HNbhood/follow/user/:userId/follower', findAllFollowers)
app.get('/api/HNbhood/follow/', findAllConnections)

var followModel = require('../models/follow/follow.model.server');
var activityModel = require('../models/activity/activity.model.server');


function findAllFollowings(req, res) {
    var userId = req.params['userId']
    followModel.findFollowings(userId)
        .then(function (response) {
            res.json(response)
        })
}

function findAllFollowers(req, res) {
    var userId = req.params['userId']
    followModel.findFollowers(userId)
        .then(function (response) {
            res.json(response)
        })
}

function findAllConnections(req, res) {
    followModel.findFollowers()
        .then(function (response) {
            res.json(response)
        })
}

function userFollows(req, res) {
    var user = req.session['currentUser']
    var userId = user._id
    var user2Id = req.params['userId']
    var type = 'follow';
    followModel.addFollow(userId, user2Id)
        .then(function () {
            return activityModel.addActivity(userId, user2Id, type)
        })
        .then(function (response) {
            res.json(response)
        })
}

function checkFollowing(req, res) {
    var user = req.session['currentUser']
    var userId = user._id
    var user2Id = req.params['userId']
    followModel.checkFollowing(userId, user2Id)
        .then(function (response) {
            res.json(response)
        })
}

function userUnfollows(req, res) {
    var user = req.session['currentUser']
    var userId = user._id
    var user2Id = req.params['userId']
    var type = 'unfollow';
    followModel.removeFollow(userId, user2Id)
        .then(function () {
            return activityModel.addActivity(userId, user2Id, type)
        })
        .then(function (response) {
            res.json(response)
        })
}



;