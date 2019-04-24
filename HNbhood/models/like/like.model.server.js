var mongoose = require('mongoose');
var likeSchema = require('./like.schema.server');
var likeModel = mongoose.model('LikeModel', likeSchema);

module.exports = {
    userLikesevent: userLikesevent,
    userUnlikesevent: userUnlikesevent,
    findLikedeventsForUser: findLikedeventsForUser,
    findUsersforLikedevent: findUsersforLikedevent,
    checkLike: checkLike,
    deleteevent: deleteevent,
    deleteUser: deleteUser
};

function userLikesevent(user, event) {
    var date = new Date();
    var like = {
        user: user._id,
        event: event._id,
        date: date
    };
    return likeModel.create(like);
}

function userUnlikesevent(user, event) {
    var like = {
        user: user._id,
        event: event._id
    };
    return likeModel.deleteOne(like);
}

function deleteevent(eventId) {
    return likeModel.remove({event: eventId})
}

function deleteUser(userId) {
    return likeModel.remove({user: userId})
}

function findLikedeventsForUser(userId) {
    return likeModel
        .find({user: userId})
        .populate('event')
        .exec();
}

function findUsersforLikedevent(eventId) {
    return likeModel
        .find({event: eventId})
        .populate('user')
        .exec();
}


function checkLike(userId, eventId) {
    var like = {
        user: userId,
        event: eventId
    };
    return likeModel.findOne(like);
}
