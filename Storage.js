/**
 * Created by yannickvanoekelen on 3/01/17.
 */
/**
 * Created by yannickvanoekelen on 13/11/16.
 */
// Following extensions/dependancies need to be installed via "npm install {extension} --save" in terminal
// Express - webservice (default on webstorm application)
// Parser - parse body from HTTP requests
// (The information above comes from LSteffens github)
/// Shortid - unique ID generator -->  check package.json under 'dependancies'


// Load the necessary extensions
var express = require('express');
var parser = require('body-parser');
var shortid = require('shortid');

// Load datastore
var store = require("./storage.js");

// Load validator, thinking about how I'm going to fix that :(

// Create webservice
var app = express();
app.use(parser.json());


//                                              DRONES                                                                //
//  01 Drones
// GET requests on /drones
app.get("/drones", function (request, response) {
    response.send(store.listDrones());
});

// GET requests on /drones with specific ID => /drones/:id
app.get("/drones/:id", function (request, response) {
    var drone = store.searchDrones(request.params.id);
    if (drone) {
        response.send(drone); // If a drone is found, return this drone information
    } else {
        response.status(404).send(); // If no drone is found, return code 404 'page not found'
    }
});

// POST requests on /drones
app.post("/drones", function (request, response) {
    var drone = request.body; // Take in the JSON request body from the POST request

    // ID is chosen by the server, it generates a unique ID
    var uniqueID = shortid.generate(); //This line generates the unique ID
    drone.id = uniqueID;

    // Add the measurement to the store
    store.addDrone();
    response.status(201).location("../drones/"+drone.id).send(); //Respond with the 201 status 'Created' and give back the URL of the created drone.
});

//                                            MEASUREMENTS                                                            //
// 08 MEASUREMENTS
// GET requests on /measurements
app.get("/measurements", function (request, response) {
    response.send(store.listMeasurements());
});

// GET requests on /measurements with ID => /measurements/:id
app.get("/measurements/:id", function (request, response) {
    var measurement = store.searchMeasurements(request.params.id);
    if (measurement) {
        response.send(measurement); // If a measurement is found, return this measurement
    } else {
        response.status(404).send(); // If no measurement is found, return code 404 'page not found'
    }
});

// POST request on /measurements
app.post("/measurements", function (request, response) {
    var measurement = request.body;

    // ID is chosen by the server, it is a combination of the droneID and a unique generated ID
    var uniqueID = shortid.generate(); //This line generates the unique ID
    measurement.id = measurement.drone.id + uniqueID;

    // add the measurement to the store
    store.addMeasurement();
    response.status(201).location("../measurements/"+measurement.id).send(); //Respond with the 201 status 'Created' and give the URL of the created measurement.
});

// Start the webservice on port 3000
app.listen(3000);
console.log("The service is now running at http://127.0.0.1:3000");

