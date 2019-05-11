var doges = require("../models").Doge;

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
        doges.create(req.body);
        // reload home page
        res.redirect("/");
    });

    // Create a new example
    app.post("/api/examples", function(req, res) {
        db.Example.create(req.body).then(function(dbExample) {
        res.json(dbExample);
        });
    });

    // Delete an example by id
    app.delete("/api/examples/:id", function(req, res) {
        db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
        res.json(dbExample);
        });
    });
};
