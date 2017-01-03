/**
 * Created by yannickvanoekelen on 3/01/17.
 */
/**
 * Created by yannickvanoekelen on 13/11/16.
 */

var express = require('express');
var parser = require('body-parser');
var shortid = require('shortid');


var dal = require("./storage");
var val = require("./validate");


var app = express();
app.use(parser.json());


String.prototype.ucfirst = function() {
    return this.charAt(0).toUpperCase() + this.substr(1);
};


// 01 Drones //
//work in progress

// 02 Buildings //


// 03 Sensors //
app.get("/sensors", function (request, response) {
    dal.getSensors(function (sensors) {
        response.send(sensors);
    })
});

app.get("/sensors/:id", function (request, response) {
    dal.getSensorByID(function (sensor){
        response.send(sensor);
    }, request.params.id.toString());
});

app.get("/drones/:id/sensors", function (request, response) {
    dal.getSensorsByDroneID(function (droneSensors) {
        response.send(droneSensors);
    }, request.params.id.toString());
});








app.listen(4567);
console.log("Yay, the server is running!");