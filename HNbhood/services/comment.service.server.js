var app = require('../../express');

var commentModel = require('../models/comment/comment.model.server');
var eventModel = require('../models/event/event.model.server');
var actModel = require('../models/activity/activity.model.server');

app.get('/api/HNbhood/comment/event/:eventId', findAllcomments);
app.post('/api/HNbhood/comment/event/:eventId', usercommentsEvent);
app.delete('/api/HNbhood/comment/event/:eventId/user/:userId', deletecomment);


function findAllcomments(req, res) {
    var id = req.params['eventId'];
    eventModel.findeventByApiId(id)
        .then(function (m) {
            if (m === null) {
                res.send([])
            } else {
                commentModel.findAllcommentsForevent(m._id)
                    .then(function (comments) {
                        res.send(comments)
                    })
            }
        })

}

function usercommentsEvent(req, res) {
    var event = req.body;
    var comment = req.body.comment;
    var user = req.session['currentUser'];
    var userId = user._id;
    var EventId;
    var type = 'add comment';
    console.log("commenting");
    console.log(event.id);
    eventModel.findeventByApiId(event.id)
        .then(function (m) {
            if (m === null) {
                return eventModel.createevent(event)
            } else {
                return m
            }
        })
        .then(function (mov) {
            EventId = mov._id;
            return commentModel.usercommentsevent(user, mov, comment)
        })
        .then(function () {
            return eventModel.incrementeventcomments(EventId)
        })
        .then(function () {
            return actModel.addActivity(userId, EventId, type)
        })
        .then(function (result) {
            res.send(result);
        })
}

function deletecomment(req, res) {
    var body = req.body;
    var comment = body.comment;
    var userId = req.params['userId']
    var apiId = req.params['eventId']
    var EventId;
    var type = 'delete comment'
    eventModel.findeventByApiId(apiId)
        .then(function (mov) {
            EventId = mov._id
            return commentModel.userUncommentsevent(userId, mov._id, comment)
        })
        .then(function () {
            return eventModel.decrementeventcomments(EventId)
        })
        .then(function () {
            return actModel.addActivity(userId, EventId, type)
        })
        .then(function (result) {
            res.send(result);
        })


}
