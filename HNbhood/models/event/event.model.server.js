var mongoose = require('mongoose');
var eventSchema = require('./event.schema.server');
var eventModel = mongoose.model('eventModel', eventSchema);

function createevent(event) {
    event.likes = 0;
    event.comments = 0;
    return eventModel.create(event);
}

function findeventByApiId(eventId) {
    console.log(eventId);
    return eventModel.findById(eventId);
}

function findAllevents() {
    return eventModel.find();
}

function findeventsLikedByUser(userId) {
    return eventModel.find({userId: userId});
}

function incrementeventLikes(eventId) {
    return eventModel.update({_id: eventId}, {
        $inc: {likes: 1}
    });
}

function decrementeventLikes(eventId) {
    return eventModel.update({_id: eventId}, {
        $inc: {likes: -1}
    });
}


function incrementeventcomments(eventId) {
    return eventModel.update({_id: eventId}, {
        $inc: {comments: 1}
    });
}


function decrementeventcomments(eventId) {
    return eventModel.update({_id: eventId}, {
        $inc: {comments: -1}
    });
}



function deleteevent(id) {
    return eventModel.remove({_id: id});
}

function updateevent(eventId, event) {
    // if (user.img_path === '' || user.img_path === undefined) {
    //     user.img_path = "https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100"
    // }
    // if (user.role === ''|| user.role === undefined ) {
    //     user.role = 'user';
    // }
    return eventModel.update({_id: eventId}, {
        $set: {
            title: event.title,
            poster_path: event.poster_path,
            overview: event.overview,
        },
    })
}


module.exports = {
    createevent: createevent,
    findAllevents: findAllevents,
    findeventsLikedByUser: findeventsLikedByUser,
    incrementeventLikes: incrementeventLikes,
    decrementeventLikes: decrementeventLikes,
    findeventByApiId: findeventByApiId,
    incrementeventcomments: incrementeventcomments,
    decrementeventcomments: decrementeventcomments,
    deleteevent: deleteevent,
    updateevent: updateevent,
};
