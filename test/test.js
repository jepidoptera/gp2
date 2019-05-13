var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/alldoges", function() {
    // Before each test begins, create a new request server for testing
    // & delete all examples from the db
    beforeEach(function() {
        request = chai.request(server);
        return db.sequelize.sync({ force: true });
    });

    it("should find all examples", function(done) {
        // Add some examples to the db to test with
        
        db.Doges.bulkCreate([
        {
            name: "Mr. Fluffhead",
            breed: "poodle",
            location: "minneapolis",
            description: "A fake dog",
            email: "somewhere@something.com",
            password: "5f4dcc3b5aa765d61d8327deb882cf99"
        },
        {
            name: "Madam Pomeranian",
            breed: "pomeranian",
            location: "minneapolis",
            description: "This one's real",
            email: "somewhere@something.com",
            password: "5f4dcc3b5aa765d61d8327deb882cf99"
        }
        ]).then(function() {
        // Request the route that returns all examples
        request.get("/api/alldoges").end(function(err, res) {
            var responseStatus = res.status;
            var responseBody = res.body;

            // Run assertions on the response

            expect(err).to.be.null;

            expect(responseStatus).to.equal(200);

            expect(responseBody)
            .to.be.an("array")
            .that.has.lengthOf(2);

            expect(responseBody[0])
            .to.be.an("object")
            .that.includes({
                name: "Mr. Fluffhead",
                description: "A fake dog"
            });

            expect(responseBody[1])
            .to.be.an("object")
            .that.includes({
                name: "Madam Pomeranian",
                description: "This one's real"
            });

            // The `done` function is used to end any asynchronous tests
            done();
        });
        });
    });
});

describe("POST /api/doges", function() {
    // Before each test begins, create a new request server for testing
    // & delete all examples from the db
    beforeEach(function() {
        request = chai.request(server);
        return db.sequelize.sync({ force: true });
    });

    it("should create three dogs", function(done) {
        // Create an object to send to the endpoint
        var posts = [
          {
            name: "Mr. Fluffhead",
            breed: "poodle",
            location: "minneapolis",
            description: "A fake dog",
            email: "somewhere@something.com",
            password: "5f4dcc3b5aa765d61d8327deb882cf99"
          },
          {
            name: "Madame Pomeranian",
            breed: "poodle",
            location: "minneapolis",
            description: "This one's real.  Just kidding.",
            email: "somewhere@something.com",
            password: "5f4dcc3b5aa765d61d8327deb882cf99"
          },
          {
            name: "Artemis",
            breed: "unknown",
            location: "minneapolis",
            description: "May actually be a cat.",
            email: "somewhere@something.com",
            password: "5f4dcc3b5aa765d61d8327deb882cf99"
          }
        ];

        posts.forEach(post => {
        // POST the request body to the server

        request
            .post("/api/newdoge")
            .send(post)
            .end(function(err, res) {
                var responseStatus =
                    res.status;
                var responseBody =
                    res.body;

                // Run assertions on the response
                expect(err).to.be.null;
                expect(responseStatus).to.equal(200);

                expect(responseBody).to.be.an("object")
                    .that.includes(post);

            });
        });
        // The `done` function is used to end any asynchronous tests
        done();
    });
});

describe("POST /api/message", function() {
    // Before each test begins, create a new request server for testing
    // & delete all examples from the db
    beforeEach(function() {
        request = chai.request(server);
        return db.sequelize.sync({ force: false });
    });

    // Create a message chain
    var convo = [
        {
            sender: 3,
            recipient: 1,
            text: "hi"
        },{
            sender: 1,
            recipient: 3,
            text: "hello there"
        },{
            sender: 3,
            recipient: 1,
            text: "how's it goin?",
        },
    ];

    var otherConvo = [
        {
            sender: 1,
            recipient: 2,
            text: "hey there beautiful ;)"
        },{
            sender: 2,
            recipient: 1,
            text: "whoa, comin on a little strong there"
        },{
            sender: 1,
            recipient: 2,
            text: "sorry, I got carried away"
        }
    ];
    
    it("should create a message chain", function (done) {
        // POST all of these messages to the server
        convo.concat(otherConvo).forEach(message => {
            request
                .post("/api/message")
                .send(message)
                .end(function (err, res) {
                    var responseStatus = res.status;
                    var responseBody = res.body;

                    // Run assertions on the response

                    expect(err).to.be.null;

                    expect(responseStatus).to.equal(200);

                    // console.log(JSON.stringify(responseBody));
                    expect(responseBody)
                        .to.be.an("object")
                        .that.includes(message);

                });
        });
        // The `done` function is used to end any asynchronous tests
        done();
    });
    
    it("should retrieve a conversation", function (done) {
        request.get("/api/messages/convo/1/2").end(function(err, res) {
            var responseStatus = res.status;
            var responseBody = res.body;

            // Run assertions on the response

            expect(err).to.be.null;

            expect(responseStatus).to.equal(200);

            expect(responseBody)
            .to.be.an("array")
            .that.has.lengthOf(3);

            expect(responseBody[0])
              .to.be.an("object")
              .that.includes(otherConvo[0]);

            expect(responseBody[1])
              .to.be.an("object")
              .that.includes(otherConvo[1]);

            // The `done` function is used to end any asynchronous tests
            done();
        });
    });

    it ("should get only recent messages", function (done) {
        // check time
        var lastID = 6;
        // create some messages
        db.Messages.bulkCreate([
          {
            sender: 1,
            recipient: 2,
            text: "np. u lookin to breed?"
          },
          {
            sender: 2,
            recipient: 1,
            text: "You know it baby ;)"
          }
        ]);
        // retrieve all messages create since that timestamp
        // should be just those two
        request.get("/api/messages/convo/1/2/" + lastID)
            .end(function (err, messages) {
                if (err) console.log("ERROR: \n" + JSON.stringify(err));
                console.log(JSON.stringify(messages.body));
                expect(messages.body).to.be.an("array")
                    .that.has.lengthOf(2);
                done();
            }
        );
    });
});

