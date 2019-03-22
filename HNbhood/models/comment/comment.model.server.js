var mongoose = require('mongoose');
var commentSchema = require('./comment.schema.server');
var commentModel = mongoose.model('commentModel',commentSchema);

function usercommentsevent(user, event, comment) {
    var date = new Date();
    var c = {
        user: user._id,
        event: event._id,
        comment: comment,
        date: date.toString()
    };
    return commentModel.create(c);
}

function userUncommentsevent(userId, eventId, comment) {
    var c = {
        user: userId,
        event: eventId,
        comment: comment,
    };
    return commentModel.remove(c);
}

function findcommentedeventsForUser(userId) {
    return commentModel
        .find({user: userId})
        .populate('event')
        .exec();
}

function findAllcommentsForevent(eventId) {
    return commentModel
        .find({event: eventId})
        .populate('user')
        .exec();
}

function deleteevent(eventId){
    return commentModel.remove({event: eventId})
}

function deleteUser(userId){
    return commentModel.remove({user: userId})
}



module.exports = {
    usercommentsevent: usercommentsevent,
    findcommentedeventsForUser: findcommentedeventsForUser,
    findAllcommentsForevent: findAllcommentsForevent,
    deleteevent: deleteevent,
    deleteUser: deleteUser,
    userUncommentsevent: userUncommentsevent
};