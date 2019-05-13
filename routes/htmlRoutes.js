// jshint esversion:6
var db = require("../models");
var path = require("path");
const Op = require("sequelize").Op;

module.exports = function(app) {
    // Load index page
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "..", "public", "signIn", "form.html"));
    });

    app.get("/home/:userID", function (req, res) {
        doges.findOne({ where: { id: req.params.userID } }).then(doge => {
            // send back info on this doge
            res.render("dashboard", doge.dataValues);
        });
    });

    app.get("/signup", function (req, res) {
        res.render("signup.handlebars");
    });

    app.get("/data", function (req, res) {
        db.Doge.findAll().then(function (dogs) {
            res.render("index", {
                msg: "Welcome!",
                dogs: dogs
            });
        });
    });


    app.get("/messages/:userID", function (req, res) {
        // find current user
        db.Doges.findOne({ where: { id: req.params.userID } }).then(user => {
            // find all other users whom they might message
            console.log();
            db.Doges.findAll({ where: { [Op.not]: { id: req.params.userID } } }).then(others => {
            // console.log(
            //   Object.assign({}, user.dataValues, { otherDogs: others })
            // );
                // console.log("other users: " + JSON.stringify(others));
                res.render(
                    "messages.handlebars",
                    // combine 'user' and 'others' into one object
                    Object.assign({}, user.dataValues, { otherDogs: others })
                );
            });
        });
    });

    app.get("/convo/:user1ID/:user2ID", function (req, res) {
        console.log("conversation between " + req.params.user1ID + " and " + req.params.user2ID);
        // get the names of the two conversants and pass them to the handlebars template
        db.Doges.findOne({ where: { id: req.params.user1ID } }).then(doge1 => {
            db.Doges.findOne({ where: { id: req.params.user2ID } }).then(doge2 => {
                console.log("1 = " + doge1.name);
                console.log("2 = " + doge2.name);
                res.render("convo", { doge1: doge1, doge2: doge2 });
            });
        });
    });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};
