var app = require('../../express');


app.get('/api/HNbhood/:eventId', findEvent);
app.delete('/api/HNbhood/:EventId', deleteEvent);
app.put('/api/HNbhood/:EventId', updateEvent);
app.get('/api/HNbhood/', findAllEvents);
app.post('/api/HNbhood/user/:userId/event', createEvent);


var eventModel = require('../models/event/event.model.server');
var reviewModel = require('../models/comment/comment.model.server');
var likeModel = require('../models/like/like.model.server');
var bookmarkModel = require('../models/bookmark/bookmark.model.server');
var activityModel = require('../models/activity/activity.model.server');


function createEvent(req, res) {
    var event = req.body;
    eventModel.createevent(event)
        .then(function (Event) {
        res.json(Event);
    })
}

function findEvent(req, res) {
    var id = req.params['eventId'];
    console.log(id);
    eventModel.findeventByApiId(id)
        .then(function (Event) {
            res.json(Event)
        });

}


function findAllEvents(req, res) {
    eventModel.findAllevents()
        .then(function (Events) {
            res.json(Events)
        });
}

function updateEvent(req, res) {
    var Event = req.body;
    var id = req.params.EventId;
    eventModel.updateevent(id, Event)
        .then(function () {
            res.json(Event);
        })
}

function deleteEvent(req, res) {
    var id = req.params.EventId;
    likeModel.deleteevent(id)
        .then(function () {
            return bookmarkModel.deleteevent(id)
        })
        .then(function () {
            return reviewModel.deleteevent(id)
        })
        .then(function () {
            return activityModel.deleteevent(id)
        })
        .then(function () {
            return eventModel.deleteevent(id)
        })
        .then(function (Event) {
            res.json(Event);
        })

};