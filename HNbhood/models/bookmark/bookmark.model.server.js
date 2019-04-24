var mongoose = require('mongoose');
var bookmarkSchema = require('./bookmark.schema.server');
var bookmarkModel = mongoose.model(
    'BookmarkModel',
    bookmarkSchema
);

function userBookmarksevent(user, event) {
    var date = new Date();
    var bookmark = {
        user: user._id,
        event: event._id,
        date: date
    };
    return bookmarkModel.create(bookmark);
}

function userUnbookmarksevent(user, event) {
    var bookmark = {
        user: user._id,
        event: event._id
    };
    return bookmarkModel.deleteOne(bookmark);
}

function findBookmarkedeventsForUser(userId) {
    return bookmarkModel
        .find({user: userId})
        .populate('event')
        .exec();
}

function findUsersforBookmarkedevent(eventId) {
    return bookmarkModel
        .find({event: eventId})
        .populate('user')
        .exec();
}

function checkBookmark(userId, eventId) {
    var bookmark = {
        user: userId,
        event: eventId
    };
    return bookmarkModel.findOne(bookmark);
}

function deleteevent(eventId) {
    return bookmarkModel.remove({event: eventId})
}

function deleteUser(userId) {
    return bookmarkModel.remove({user: userId})
}


module.exports = {
    userBookmarksevent: userBookmarksevent,
    userUnbookmarksevent: userUnbookmarksevent,
    findBookmarkedeventsForUser: findBookmarkedeventsForUser,
    findUsersforBookmarkedevent: findUsersforBookmarkedevent,
    checkBookmark: checkBookmark,
    deleteevent: deleteevent,
    deleteUser: deleteUser
};
