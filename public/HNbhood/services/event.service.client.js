(function () {
angular
.module('WamApp')
.service('eventService', eventService);

function eventService($http) {

this.findAlleventsForUser = findAllEventsForUser;
this.findeventById = findEventById;
this.createevent = createEvent;
this.updateevent = updateEvent;
this.deleteevent = deleteEvent;

function findEventById(eventId) {
    var url = "/api/HNbhood/event/"+eventId;
    return $http.get(url)
        .then(function (response) {
            return response.data;
        });
}

function findAllEventsForUser(userId) {
    var url = "/api/HNbhood/user/"+userId+"/event";
    return $http.get(url)
        .then(function (response) {
            return response.data;
        });
}

function createEvent(event) {
    var url = "/api/HNbhood/user/:userId/event";
    return $http.post(url, event)
        .then(function (response) {
            return response.data;
        })
}

function deleteEvent(eventId) {
    var url = "/api/HNbhood/event/"+eventId;
    return $http.delete(url)
        .then(function (response) {
            return response.data;
        })
}

function updateEvent(eventId, event) {
    var url = "/api/HNbhood/event/"+eventId;
    return $http.put(url, event)
        .then(function (response) {
            return response.data;
        })
}
}
})();