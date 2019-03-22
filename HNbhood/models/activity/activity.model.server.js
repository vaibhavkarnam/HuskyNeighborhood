var mongoose = require('mongoose');
var activitySchema = require('./activity.schema.server');
var activityModel = mongoose.model(
    'ActivityModel',
    activitySchema
);


function findAllActivities() {
    return activityModel.find()
        .populate('event')
        .populate('user')
        .populate('user2')
        .exec();
}

function addActivity(Id, Id2, type) {
    var date = new Date();
    var activity;
    if (type === 'follow' || type === 'unfollow') {
        activity = {
            user: Id,
            user2: Id2,
            type: type,
            date: date
        };
    }
    else {
        activity = {
            user: Id,
            event: Id2,
            type: type,
            date: date
        };
    }
    return activityModel.create(activity);
}

function findActivitydeventsForUser(userId) {
    return activityModel
        .find({user: userId})
        .populate('event')
        .exec();
}

function findUsersforActivitydevent(eventId) {
    return activityModel
        .find({event: eventId})
        .populate('user')
        .exec();
}

function checkActivity(userId, eventId) {
    var activity = {
        user: userId,
        event: eventId
    }
    return activityModel.findOne(activity);
}

function deleteevent(id){
    return activityModel.remove({event: id})
}

function deleteUser1(id){
    return activityModel.remove({user: id})

}

function deleteUser2(id){
    return activityModel.remove({user2: id})

}


module.exports = {
    findAllActivities: findAllActivities,
    addActivity: addActivity,
    findActivitydeventsForUser: findActivitydeventsForUser,
    findUsersforActivitydevent: findUsersforActivitydevent,
    checkActivity: checkActivity,
    deleteevent: deleteevent,
    deleteUser1: deleteUser1,
    deleteUser2: deleteUser2
};