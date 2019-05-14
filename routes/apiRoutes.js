// jshint esversion: 6
var doges = require("../models").Doges;
var messages = require("../models").Messages;
const Op = require("sequelize").Op;

module.exports = function(app) {
    // Get all dogs and return as json
    app.get("/api/alldoges", function(req, res) {
        doges.findAll({}).then(function(doges) {
            res.json(doges);
        });
    });

    app.post("/api/newdoge", function (req, res) {
        // add a new doge from the form data
        console.log("creating: " + JSON.stringify(req.body));
        // do some validation: make sure we're not reusing an email or username
        doges.findAll({ where: { name: req.body.name } }).then(data => {
            if (data) {
                res.status(409).send("username is already taken.");
                return;
            } 
        });
        doges.findAll({ where: { email: req.body.email } }).then(data => {
            if (data) {
                res.status(409).send("email is already taken.");
                return;
            }
        });
        // no conflicts: create new doge
        doges.create(req.body).then(data => {
            // reload home page
            res.send(data.dataValues);
        });
    });

    app.post("/api/login/:userID", function (req, res) {

    });

    app.get("/api/name/:dogename", function (req, res) {
        // look up by username
        console.log("getting info on user with name: " + req.params.dogename);
        doges.findOne({ where: { name: req.params.dogename } }).then(doge => {
            if (doge) {
                res.send(doge.dataValues);
            }
            else {
                res.status(404).send("couldn't find that user");
            }
        });  
    });

    app.get("/api/ID/:userID", function (req, res) {
        // look up by ID
        console.log("getting info on user with ID: " + req.params.userID);
        doges.findOne({ where: { id: req.params.userID } }).then(doge => {
            // send back info on this doge
            res.send(doge.dataValues);
        });
    });

    app.get("/api/messages/convo/:user1ID/:user2ID/:since?", function (req, res) {
        console.log("retrieving message chain:");
        // find user1
        doges.findOne({where: {id: req.params.user1ID}
        }).then((user1) => {
            console.log("found user: " + user1.name);
            // find user2
            doges.findOne({ where: { id: req.params.user2ID } }).then((user2) => {
                console.log("found user: " + user2.name);
                console.log("getting all messages between " + user1.name + " and " + user2.name + "... since " + req.params.since);
                messages
                  .findAll({
                      where: {
                        // find only with id > "since"
                      id: { [Op.gt]: req.params.since || 0 },
                      [Op.or]: [
                        {
                          [Op.and]: [
                            { sender: req.params.user1ID },
                            { recipient: req.params.user2ID }
                          ]
                        },
                        {
                          [Op.and]: [
                            { sender: req.params.user2ID },
                            { recipient: req.params.user1ID }
                          ]
                        }
                      ]
                    }
                  })
                  .then(messages => {
                      console.log(JSON.stringify(messages));
                      res.json(messages);
                  });
            });
        });
    });

    app.post("/api/message", function (req, res) {
        // sending a message from user1 to user2
        console.log("message: " + JSON.stringify(req.body));
        messages.create({
            sender: parseInt(req.body.sender),
            recipient: parseInt(req.body.recipient),
            text: req.body.text
        })
            // return data
            .then((data) => { res.send(data); });
    });

    // Delete an example by id
    app.delete("/api/examples/:id", function(req, res) {
        db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
        res.json(dbExample);
        });
    });
};

function randomHexNumber(length) {
    // get a random hexadecimal number of the specified length
    var returnVal = "";
    for (i = 0; i < length; i++) {
        returnVal += "1234567890abcdef"[Math.floor(Math.random() * 16)];
    }
    return returnVal;
}    

