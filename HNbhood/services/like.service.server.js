var app = require('../../express');

app.post('/api/HNbhood/like/event', userLikesevent);
app.delete('/api/HNbhood/like/event/:eventId', userUnlikesevent);
app.get('/api/HNbhood/like/event/:eventId', checkLike);
app.get('/api/HNbhood/like/user/:userId/event/', findAllLikedeventsForUser);
app.get('/api/HNbhood/like/event/:eventId/user/', findUsersForLikedevent);


var likeModel = require('../models/like/like.model.server');
var eventModel = require('../models/event/event.model.server');
var activityModel = require('../models/activity/activity.model.server');


function checkLike(req, res) {
    var id = req.params['eventId'];
    var user = req.session['currentUser'];
    var userId = user._id;
    eventModel.findeventByApiId(id)
        .then(function (m) {
            if (m === null) {
                res.send(false)
            } else {
                likeModel.checkLike(userId, m._id)
                    .then(function (like) {
                        if (like === null) {
                            res.send(false)
                        } else {
                            res.send(true)
                        }
                    })
            }
        })

}

function findAllLikedeventsForUser(req, res) {
    var userId = req.params['userId'];
    likeModel.findLikedeventsForUser(userId)
        .then(function (result) {
            res.json(result);
        })
}

function findUsersForLikedevent(req, res) {
    var id = req.params['eventId'];
    likeModel.findUsersforLikedevent(id)
        .then(function (event) {
            res.json(event)
        });
}


function userLikesevent(req, res) {
    var event = req.body;
    var user = req.session['currentUser'];
    var userId = user._id;
    var eventId;
    var type = 'like'
    eventModel.findeventByApiId(event.id)
        .then(function (m) {
            if (m === null) {
                return eventModel.createevent(event)
            } else {
                return m
            }
        })
        .then(function (mov) {
            eventId = mov._id;
            return likeModel.userLikesevent(user, mov)
        })
        .then(function () {
            return eventModel.incrementeventLikes(eventId)
        })
        .then(function () {
            return activityModel.addActivity(userId, eventId, type)
        })
        .then(function (result) {
            res.send(result);
        })
}


function userUnlikesevent(req, res) {
    var event = req.body;
    var user = req.session['currentUser']
    var userId = user._id
    var eventId;
    var type = 'unlike';
    eventModel.findeventByApiId(event.id)
        .then(function (mov) {
            eventId = mov._id;
            return likeModel.userUnlikesevent(user, mov)
        })
        .then(function () {
            return eventModel.decrementeventLikes(eventId)
        })
        .then(function () {
            return activityModel.addActivity(userId, eventId, type)
        })
        .then(function (result) {
            res.send(result);
        })


}
;
