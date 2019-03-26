var orgModel = require('../models/org/org.model.server');


var app = require('../../express');

app.get('/api/HNbhood/org/:orgId', findorgById);
app.get('/api/HNbhood/org/find', findorgs);
app.delete('/api/HNbhood/org/:orgId', deleteorg);
app.post('/api/HNbhood/org', createorg);
app.put('/api/HNbhood/org/:orgId', updateorg);



function updateorg(req, res) {
    var usr = req.body;
    orgModel
        .updateorg(req.params.orgId, usr)
        .then(function (status) {
            res.send(status);
        });

}


function findorgs(req, res) {
    console.log("newwwww");
    var orgname = req.query.orgname;
    var password = req.query.password;
    console.log("newwwww");
    if (orgname && password) {
        orgModel
            .findorgByCred(orgname, password)
            .then(function (org) {
                if (org) {
                    res.json(org);
                } else {
                    res.sendStatus(404);
                }
            });

    } else if (orgname) {
        orgModel
            .findorgByorgname(orgname)
            .then(function (org) {
                if (org) {
                    res.json(org);
                } else {
                    res.sendStatus(404);
                }
            });

    } else {
        console.log("newwwww");
        orgModel
            .findAllorgs()
            .then(function (orgs) {
                res.json(orgs);
            });
    }

}

function createorg(req, res) {
    console.log("hi");
    var org = req.body;
    orgModel
        .createorg(org)
        .then(function (org) {
            res.json(org);
        }, function (err) {
            res.send(err);
        });
}

function deleteorg(req, res) {

    var orgId = req.params.orgId;
    orgModel
        .deleteorg(orgId)
        .then(function (status) {
            res.send(status);
        });
}

function findorgById(req, res) {


    var orgId = req.params['orgId'];

    orgModel
        .findorgById(orgId)
        .then(function (org) {
            res.json(org);
        });
}
