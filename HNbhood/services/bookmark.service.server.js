var app = require('../../express');

app.post('/api/HNbhood/bookmark/event', userBookmarksevent);
app.delete('/api/HNbhood/bookmark/event/:eventId', userUnbookmarksevent);
app.get('/api/HNbhood/bookmark/event/:eventId/check', checkBookmark);
app.get('/api/HNbhood/bookmark/user/:userId/event/', findAllBookmarkedeventsForUser);


var bookmarkModel = require('../models/bookmark/bookmark.model.server');
var eventModel = require('../models/event/event.model.server');
var activityModel = require('../models/activity/activity.model.server');


function checkBookmark(req, res) {
    var id = req.params['eventId'];
    var user = req.session['currentUser'];
    var userId = user._id
    eventModel.findeventByApiId(id)
        .then(function (m) {
            if (m === null) {
                res.send(false)
            } else {
                bookmarkModel.checkBookmark(userId, m._id)
                    .then(function (bookmark) {
                        if (bookmark === null) {
                            res.send(false)
                        } else {
                            res.send(true)
                        }
                    })
            }
        })

}

function findAllBookmarkedeventsForUser(req, res) {
    var userId = req.params['userId'];
    bookmarkModel.findBookmarkedeventsForUser(userId)
        .then(function (result) {
            res.json(result);
        })
}


function userBookmarksevent(req, res) {
    var event = req.body;
    var user = req.session['currentUser'];
    var userId = user._id;
    var eventId;
    var type = 'bookmark';
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
            return bookmarkModel.userBookmarksevent(user, mov)
        })
        .then(function () {
            return activityModel.addActivity(userId, eventId, type)
        })
        .then(function (result) {
            res.send(result);
        })
}


function userUnbookmarksevent(req, res) {
    var event = req.body;
    var user = req.session['currentUser'];
    var userId = user._id;
    var eventId;
    var type = 'unbookmark';
    console.log("unbookmarking");
    console.log(event.id);
    eventModel.findeventByApiId(req.params['eventId'])
        .then(function (mov) {
            eventId = mov._id;
            return bookmarkModel.userUnbookmarksevent(user, mov)
        })
        .then(function () {
            return activityModel.addActivity(userId, eventId, type)
        })
        .then(function (result) {
            res.send(result);
        })


}
;