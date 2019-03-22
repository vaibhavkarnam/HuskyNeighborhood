var mongoose = require('mongoose');
var orgSchema = require('./org.schema.server');
var orgModel = mongoose.model('orgModel', orgSchema);


var orgs = {
    createorg: createorg,
    findAllorgs: findAllorgs,
    findorgById: findorgById,
    findorgByCred: findorgByCred,
    updateorg: updateorg,
    findorgByorgname: findorgByorgname,
    deleteorg: deleteorg,
};

function createorg(org) {

    console.log('hi');


    if (org.img_path === '' || org.img_path === undefined) {
        org.img_path = "https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/org.png?fit=256%2C256&quality=100"
    }

    if (org.role === '' || org.role === undefined) {
        org.role = 'org';
    }

    console.log(org);
    console.log('hi');
    return orgModel
            .create(org);

}

function findorgByCred(credentials) {

    return orgModel
            .findOne(credentials);

}

function findorgById(orgId) {

    return orgModel
            .findById(orgId);

}

function findorgByorgname(orgname) {

    return orgModel
            .findOne({orgname: orgname});

}



function deleteorg(id) {

    return orgModel
            .remove({_id: id});

}

function updateorg(orgId, org) {
    if (org.img_path === '' || org.img_path === undefined) {
        org.img_path = "https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/org.png?fit=256%2C256&quality=100"
    }

    if (org.role === '' || org.role === undefined) {
        org.role = 'org';
    }

    return orgModel.update({_id: orgId}, {

        $set: {
            orgname: org.orgname,
            firstName: org.firstName,
            lastName: org.lastName,
            email: org.email,
            password: org.password,
            gender: org.gender,
            dateB: org.dateB,
            img_path: org.img_path,
            phone: org.phone,
            address: org.address
        },
    });

}

function findAllorgs() {

    console.log("innnnn");
    return orgModel
            .find();

}


module.exports = orgs;