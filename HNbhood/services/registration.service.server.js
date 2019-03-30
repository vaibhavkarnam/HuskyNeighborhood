var app = require('../../express');

app.post('/api/HNbhood/registration/event', userregistrationsevent);
app.delete('/api/HNbhood/registration/event/:eventId', userUnregistrationsevent);
app.get('/api/HNbhood/registration/event/:eventId/check', checkregistration);
app.get('/api/HNbhood/registration/user/:userId/event/', findAllregistrationedeventsForUser);
app.get('/api/HNbhood/registration/event/:eventId', findAllUsersForEvent);



var registrationModel = require('../models/registration/registration.model.server');
var eventModel = require('../models/event/event.model.server');
var activityModel = require('../models/activity/activity.model.server');


function checkregistration(req, res) {
    var id = req.params['eventId'];
    var user = req.session['currentUser'];
    var userId = user._id
    eventModel.findeventByApiId(id)
        .then(function (m) {
            if (m === null) {
                res.send(false)
            } else {
                registrationModel.checkregistration(userId, m._id)
                    .then(function (registration) {
                        if (registration === null) {
                            res.send(false)
                        } else {
                            res.send(true)
                        }
                    })
            }
        })

}

function findAllregistrationedeventsForUser(req, res) {
    var userId = req.params['userId'];
    registrationModel.findregistrationedeventsForUser(userId)
        .then(function (result) {
            res.json(result);
        })
}

function findAllUsersForEvent(req, res) {
    var eventId = req.params['eventId'];
    registrationModel.findUsersforregistrationedevent(eventId)
        .then(function (result) {
            res.json(result);
        })
}

function userregistrationsevent(req, res) {
    var event = req.body;
    var user = req.session['currentUser'];
    var userId = user._id;
    var eventId;
    var type = 'registration';
    eventModel.findeventByApiId(event._id)
        .then(function (m) {
            if (m === null) {
                return eventModel.createevent(event)
            } else {
                return m
            }
        })
        .then(function (mov) {
            eventId = mov._id;
            return registrationModel.userregistrationsevent(user, mov)
        })
        .then(function () {
            return activityModel.addActivity(userId, eventId, type)
        })
        .then(function (result) {
            res.send(result);
        })
}


function userUnregistrationsevent(req, res) {
    var event = req.body;
    var user = req.session['currentUser'];
    var userId = user._id;
    var eventId;
    var type = 'unregistration';
    console.log("unregistrationing");
    console.log(event.id);
    eventModel.findeventByApiId(req.params['eventId'])
        .then(function (mov) {
            eventId = mov._id;
            return registrationModel.userUnregistrationsevent(user, mov)
        })
        .then(function () {
            return activityModel.addActivity(userId, eventId, type)
        })
        .then(function (result) {
            res.send(result);
        })


}
;
