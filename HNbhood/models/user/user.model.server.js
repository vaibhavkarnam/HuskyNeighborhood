var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);


var users = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUserByCred: findUserByCred,
    updateUser: updateUser,
    findUserByUsername: findUserByUsername,
    deleteUser: deleteUser,
};

function createUser(user) {

    if (user.img_path === '' || user.img_path === undefined) {
        user.img_path = "https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100"
    }

    if (user.role === '' || user.role === undefined) {
        user.role = 'user';
    }

    return userModel
            .create(user);

}

function findUserByCred(credentials) {

    return userModel
            .findOne(credentials);

}

function findUserById(userId) {

    return userModel
            .findById(userId);

}

function findUserByUsername(username) {

    return userModel
            .findOne({username: username});

}



function deleteUser(id) {

    return userModel
            .remove({_id: id});

}

function updateUser(userId, user) {
    if (user.img_path === '' || user.img_path === undefined) {
        user.img_path = "https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100"
    }

    if (user.role === '' || user.role === undefined) {
        user.role = 'user';
    }

    return userModel.update({_id: userId}, {

        $set: {
            name: user.username,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            gender: user.gender,
            dateB: user.dateB,
            img_path: user.img_path,
            bio: user.bio,
            specialization: user.bio,
            facebook: user.facebook,
            phone: user.phone,
            address: user.address
        },
    });

}

function findAllUsers() {

    return userModel
            .find();

}


module.exports = users;
