var app = require('../../express');

app.post('/api/HNbhood/activity', userActivitysevent);
app.delete('/api/HNbhood/activity', userUnactivitysevent);
app.get('/api/HNbhood/activity/user/:userId/', findAllActivitydeventsForUser);
app.get('/api/HNbhood/activity', findAllActivities);

var activityModel = require('../models/activity/activity.model.server');
var eventModel = require('../models/event/event.model.server');

function findAllActivities(req, res) {
    activityModel.findAllActivities()
        .then(function (activities) {
            res.json(activities)
        })
}

function checkActivity(req, res) {
    var id = req.params['eventId'];
    var user = req.session['currentUser'];
    var userId = user._id;
    eventModel.findeventByApiId(id)
        .then(function (m) {
            if (m === null) {
                res.send(false)
            } else {
                activityModel.checkActivity(userId, m._id)
                    .then(function (activity) {
                        if (activity === null) {
                            res.send(false)
                        } else {
                            res.send(true)
                        }
                    })
            }
        })

}

function findAllActivitydeventsForUser(req, res) {
    var userId = req.params['userId'];
    activityModel.findActivitydeventsForUser(userId)
        .then(function (result) {
            res.json(result);
        })
}


function userActivitysevent(req, res) {
    var event = req.body;
    var user = req.session['currentUser'];
    var eventId;
    eventModel.findeventByApiId(event.id)
        .then(function (m) {
            if (m === null) {
                return eventModel.createevent(event)
            } else {
                return m;
            }
        })
        .then(function (mov) {
            eventId = mov._id;
            return activityModel.userActivitysevent(user, mov);
        })
        .then(function () {
            return eventModel.incrementeventActivitys(eventId)
        })
        .then(function (result) {
            res.send(result);
        })
}


function userUnactivitysevent(req, res) {
    var event = req.body;
    var user = req.session['currentUser'];
    var eventId;
    eventModel.findeventByApiId(event.id)
        .then(function (mov) {
            eventId = mov._id;
            return activityModel.userUnactivitysevent(user, mov)
        })
        .then(function () {
            return eventModel.decrementeventActivitys(eventId)
        })
        .then(function (result) {
            res.send(result);
        })


}
;
