/**
 * Created by yannickvanoekelen on 3/01/17.
 */

//hulp gekregen van kristof en axel en daar ben ik enorm dankbaar voor//

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

//na het nalezen door klasgenoten wist men mij te vertellen dat deze lijnen essentieel zijn zodat de
// eerste letter van een string een hoogdleter kan zijn voor het zoeken op namen
String.prototype.ucfirst = function() {
    return this.charAt(0).toUpperCase() + this.substr(1);
};


// 01 Drones //
var newDrone = function (id, name, mac, location, created, updated) {
    this.id = id;
    this.name = name;
    this.mac_address = mac;
    this.location = location;
    this.created = created;
    this.updated = updated;
//we gaan hier een een variabele newdrone aanmaken die eigenlijk gaat beschrijven hoe een drone er moet uitzien
    //je kan het zien als een blueprint

};

app.get("/drones", function (request, response) {
    //we gaan hier een get doen naar /drones om aan de drones te geraken
    dal.getDrones(function (drones) {
        //we gaan hier een dalmodule inladen meerbepaald getDrones waarin we in de parameters een functie gaan meegeven die als variabele drones heeft)
        response.send(drones);
        //vervolgens gaan we de response die we krijgen doorzenden naar onze variabele drones

    })
});

app.get("/drones/:id", function (request, response) {
    //we gaan hier een get doen op sensors(en dan specifieker op op een drone met een bepaalde id)
    dal.getDroneByID(function (drone){
        //we gaan hier een dalmodule inladen meerbepaald getDroneByID waarin we in de parameters een functie gaan meegeven die als variabele drone heeft)
        response.send(drone);
        //vervolgens gaan we onze response die we krijgen doorzenden naar onze variabele drones
    }, request.params.id.toString());
    //hier gaan we onze request die we hebben gedaan op op drone(s) met de welbepaalde id omzetten naar een string
});

app.post("/drones", function (request, response) {
    //hierbij gaan we een post post request doen naar het pad (/drones) dat we hebbeen opgegeven met een gespecifieerde functie
    var drone = request.body;
    //we gaan hier in onze request body in onze variabele drone zetten
    var now = new Date();
    //in onze variabele now plaatsen we de datum
    var postDateTime = now.toISOString();
    //We gaan hierbij onze nieuwe datum naar een ISOstring (want date staat in rtf formaat) gaan aanpassen en in de variabele postDateTime gaan plaatsen


    var errors = val.fieldsNotEmpty(drone,"id", "name", "mac_address", "location");
    //we gaan hier een validatie uitvoeren of er een bepaald verplicht veld leeg is
    if (errors){
    response.status(400).send({msg:"Let goed op volgende veld(en) is leeg"+errors.concat()});
    //wanneer een bepaald veld leeg is gaan we een foutboodschap geven dat dit veld eigenlijk niet leeg mag zijn
    return;
    }

    dal.insertDrone(new newDrone(drone.id, drone.name, drone.mac_address, drone.location, postDateTime, postDateTime));
    //we gaan een dalmodule gaan oproepen en meerbepaald de insertDrone en vervolgens gaan we een nieuwe drone gaan toevoegen
    response.send("We hebben een drone met volgende id toegevoegd"+drone.id+"" );
    //we gaan een response geven met het feit dat we net een drone met dat id hebben toegevoegd
});

    app.put("/drones/:id", function (request, response) {
  //we gaan een put doen doen naar /drones/:id om tot de een drone met een welbepaalde id te komen met een bepaalde functie
  var now = new Date();
  //in onze variabele now plaatsen we de datum
  var putDateTime = now.toISOString();
  //We gaan hierbij onze nieuwe datum naar een ISOstring (want date staat in rtf formaat) gaan aanpassen en in de variabele postDateTime gaan plaatsen
  var dronesUpdate = request.body;
  //we gaan hier in onze request body in onze variabele drone zetten
  dronesUpdate.updated = putDateTime;
  console.log(dronesUpdate);
  //we gaan een console.log doen met daarin de variabele dronesUpdate
  dal.updateDrones(request.params.id.toString(), dronesUpdate);
  // we gaan een dalmodule oproepen meerbepaald de updateDrones waar we verschillende parameters aan gaan meegeven
  response.send({msg:"drone met het ID is geüpdatet"+request.params.id.toString()+"", link:"../drones/"+request.params.id.toString()});
    //Vervolgens gaan we een response sturen met daarin wat er net heeft plaatsgevonden
    });

//getracht nog een extra validatie te eerst op de drone id
    //helaas niet gelukt
//getracht nog een extra validatie te doen op mac adress
    //Helaas niet gelukt
//wanneer u graag de aanzet wilt hiervan kan ik u deze gerust sturen






// 02 Buildings //
    var newBuilding = function (id, name, city, longitude, latitude, created, updated) {
        this._id = id;
        this.name = name;
        this.city = city;
        this.longitude = longitude;
        this.latitude = latitude;
        this.created = created;
        this.updated = updated;
//we gaan hier een een variabele newbuilding aanmaken die eigenlijk gaat beschrijven hoe een gebouw er moet uitzien
        //denk hierbij aan een blueprint
    };

    app.get("/buildings", function (request, response) {
        //we gaan hier een get doen naar /buildings om aan de gebouwen teg eraken
        dal.getBuildings(function (buildings) {
            //we gaan hier een dalmodule inladen meerbepaald getBuildings waarin we in de parameters een functie gaan meegeven die als variabele buildings heeft)
            response.send(buildings);
            //vervolgens gaan we de response die we krijgen doorzenden naar onze variabele buildings
        })
    });


    app.post("/buildings", function (request, response) {
            //hierbij gaan we een post post request doen naar het pad (/buildings) dat we hebbeen opgegeven met een gespecifieerde functie
        var building = request.body;
            //we gaan hier onze request body in onze variabele building zetten
        var now = new Date();
            //in onze variabele now plaatsen we een de datum
        var postDateTime = now.toISOString();
            //We gaan hierbij onze nieuwe datum naar een ISOstring (want date staat in rtf formaat) gaan aanpassen en in de variabele postDateTime gaan plaatsen



        var errors = val.fieldsNotEmpty(building, "name", "city");
        //we gaan hier een validatie uitvoeren of er een bepaald verplicht veld leeg is
        if (errors){
            response.status(400).send({msg:"Let goed op volgende veld(en) is leeg"+errors.concat()});
            //wanneer een bepaald veld leeg is gaan we een foutboodschap geven dat dit veld eigenlijk niet leeg mag zijn
            return;
        };


 dal.getBuildingByName(function(returnNAMEbuilding){
     //we gaan hier een dalfunctie die we reeds hebben gedeclareerd gaan oproepen

 console.log('ID: '+returnNAMEbuilding.length);
        //we gaan hier een console log uitvoeren met de ID & de lengte van returnNameBuilding

    if (returnNAMEbuilding.length == 0) {
        //wanneer ruturnNameBuilding een lengte heeft die gelijk is aan nul gaan we het volgende doen
      var buildingID = shortid.generate();
        //we gaan hier een unieke id gaan genereren
      var name = building.name.ucfirst();
        //we gaan er voor zorgen dat de gebouwnaam in de variabele naam komt en dit met de eerste letter een hoofdletter
      var city = building.city.ucfirst();
        //we gaan er voor zorgen dat de stad in de variabele stad komt en dit met de eerste letter een hoofdletter
      dal.insertBuilding(new newBuilding(buildingID, name, city, building.longitude, building.latitude, postDateTime, postDateTime));
        //we gaan hier een dalmodule specifieker insertBuilding oproepen waarbij we een nieuw gebouw gaan toevoegen
      response.send({msg:"Het gebouw met volgende naam en ID is toegevoegd "+building.name+""+buildingID+"", link:"../buildings/"+buildingID});
       } else {
           //wanneer de lengte van returnNameBuilding niet gelijk is gaan nul gaat er het volgende (onderstaande) uitgevoerd worden
      response.status(409).send({msg:"Dit gebouw is reeds geregistreerd: '"+building.name+ "", link:"../buildings/"+returnNAMEbuilding[0]._id});
        //we krijgen een response status 409 met nog wet verdere uitleg
              }
        },
        building.name);
    });



// 03 Sensors //
app.get("/sensors", function (request, response) {
    //we gaan hier een get doen naar /sensors om aan de sensors te geraken
    dal.getSensors(function (sensors) {
        //We gaan hier een dalmodule inladen meerbepaald getSensors waarin we in de parameters een functie gaan meegeven die als variabele sensors heeft)
        response.send(sensors);
        //we gaan de response die we krijgen doorzenden naar onze variabele sensor
    })
});

app.get("/sensors/:id", function (request, response) {
    //we gaan hier een get doen op sensors(en dan specifieker op op een sensor met een bepaalde id)
    dal.getSensorByID(function (sensor){
        //We gaan hier een dalmodule inladen meerbepaald getSensorsByID waarin we in de parameters een functie gaan meegeven die als variabele sensors heeft)
        response.send(sensor);
        //we gaan de response die we krijgen doorzenden naar onze variabele sensor
    }, request.params.id.toString());
    //hier gaan we onze request die we hebben gedaan op id omzetten naar een string
});

app.get("/drones/:id/sensors", function (request, response) {
    //we gaan hier nog een trapje dieper dan in vorige get :)
    dal.getSensorsByDroneID(function (droneSensors) {
        //We gaan hier een dalmodule inladen meerbepaald getSensorsByID waarin we in de parameters een functie gaan meegeven die als variabele sensors heeft)
        response.send(droneSensors);
        //we gaan de response die we krijgen doorzenden naar onze variabele sensor
    }, request.params.id.toString());
    //hier gaan we onze request die we hebben gedaan op id omzetten naar een string

});

app.listen(4567);
console.log("yay, de server is online");