/**
 * Created by yannickvanoekelen on 3/01/17.
 */
/**
 * Created by yannickvanoekelen on 13/11/16.
 */
//we gaan hier onze afhankelijkheden gaan inladen
var express = require('express');
var parser = require('body-parser');
var shortid = require('shortid');

//we gaan  hier onze exterene bronnen gaan inladen
var dal = require("./Storage");
var val = require("./Validation");

//we gaan hier een webservice gaan aanmaken
var app = express();
app.use(parser.json());

//
String.prototype.ucfirst = function() {
    return this.charAt(0).toUpperCase() + this.substr(1);
};


// 01 Drones //
//work in progress
var newDrone = function (id, name, mac, location, created, updated) {
    this.id = id;
    this.name = name;
    //this.mac = mac; validatie is niet gelukt op macadres
    this.location = location;

};

app.get("/drones", function (request, response) {
    dal.getDrones(function (drones) {
        response.send(drones);
    })
});

app.get("/drones/:id", function (request, response) {
    dal.getDroneByID(function (drone){
        response.send(drone);
    }, request.params.id.toString());
});

app.post("/drones", function (request, response) {
    var drone = request.body;
    var now = new Date();
    var postDateTime = now.toISOString();

var errors = val.fieldsNotEmpty(drone,"id", "name", "mac_address", "location");
if (errors){
response.status(400).send({msg:"Let goed op volgende veld(en) is leeg"+errors.concat()});
return;
};
    app.put("/drones/:id", function (request, response) {
        var now = new Date();
        var putDateTime = now.toISOString();
        var dronesUpdate = request.body;
        dronesUpdate.updated = putDateTime;
        console.log(dronesUpdate);


        dal.updateDrones(request.params.id.toString(), buildingUpdate);
        response.send({msg:"drone met het ID is geüpdatet"+request.params.id.toString()+"", link:"../drones/"+request.params.id.toString()});
    });

//getracht nog een extra validatie te eerst op de drone id
    //helaas niet gelukt
//getracht nog een extra validatie te doen op mac adress
    //Helaas niet gelukt
//wanneer u graag de aanzet wilt hiervan kan ik u deze gerust sturen



// 02 Buildings //
    var newBuilding = function (id, name, city, longitude, latitude) {
        this._id = id;
        this.name = name;
        this.city = city;
        this.longitude = longitude;
        this.latitude = latitude;

    };


    app.get("/buildings", function (request, response) {
        dal.getBuildings(function (buildings) {
            response.send(buildings);
        })
    });


    app.post("/buildings", function (request, response) {
        var building = request.body;
        var now = new Date();
        var postDateTime = now.toISOString();

        var errors = val.fieldsNotEmpty(building, "name", "city");
        if (errors){
            response.status(400).send({msg:"Let goed op volgende veld(en) is leeg"+errors.concat()});
            return;
        };


        dal.getBuildingByName(function(returnNAMEbuilding){
            console.log('ID: '+returnNAMEbuilding.length);

            if (returnNAMEbuilding.length == 0) {
                var buildingID = shortid.generate();
                var name = building.name.ucfirst();
                var city = building.city.ucfirst();
                dal.insertBuilding(new newBuilding(buildingID, name, city, building.longitude, building.latitude, postDateTime, postDateTime));
                response.send({msg:"Het gebouw met volgende naam en ID is toegevoegd "+building.name+""+buildingID+"", link:"../buildings/"+buildingID});
            } else {
                response.status(409).send({msg:"Dit gebouw is reeds geregistreerd: '"+building.name+ "", link:"../buildings/"+returnNAMEbuilding[0]._id});
            }
        }, building.name);
    });



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
console.log("yay, de server is online");