var mongoose = require('mongoose');
var registrationSchema = require('./registration.schema.server');
var registrationModel = mongoose.model(
    'registrationModel',
    registrationSchema
);

function userregistrationsevent(user, event) {
    var date = new Date();
    var registration = {
        user: user._id,
        event: event._id,
        date: date
    };
    return registrationModel.create(registration);
}

function userUnregistrationsevent(user, event) {
    var registration = {
        user: user._id,
        event: event._id
    };
    return registrationModel.deleteOne(registration);
}

function findregistrationedeventsForUser(userId) {
    return registrationModel
        .find({user: userId})
        .populate('event')
        .exec();
}

function findUsersforregistrationedevent(eventId) {
    return registrationModel
        .find({event: eventId})
        .populate('user')
        .exec();
}

function checkregistration(userId, eventId) {
    var registration = {
        user: userId,
        event: eventId
    }
    return registrationModel.findOne(registration);
}

function deleteevent(eventId){
    return registrationModel.remove({event: eventId})
}

function deleteUser(userId){
    return registrationModel.remove({user: userId})
}


module.exports = {
    userregistrationsevent: userregistrationsevent,
    userUnregistrationsevent: userUnregistrationsevent,
    findregistrationedeventsForUser: findregistrationedeventsForUser,
    findUsersforregistrationedevent: findUsersforregistrationedevent,
    checkregistration: checkregistration,
    deleteevent: deleteevent,
    deleteUser: deleteUser
};
