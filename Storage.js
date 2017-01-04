/**
 * Created by yannickvanoekelen on 3/01/17.
 */

/**
 * Created by yannickvanoekelen on 13/11/16.
 */
    // In this project we are using 8 resources
    // 1 --> DRONES
    // 2 --> BUILDINGS
    // 3 --> SENSORS
    // 4 --> LOCATIONS
    // 5 --> EVENTS
    // 6 --> PEOPLE
    // 7 --> COURSES
    // 8 --> MEASUREMENTS


var MongoClient = require('mongodb').MongoClient;
//we gaan hier een require geven dat we onze mongodb/client nodig hebben
var url = 'mongodb://localhost:27017/prober';
//we haan hier het localhost adres meegeven

var dal = {
    db : null,

//Hieronder komen stukken terug uit ex-8 met enkele toevoegingen.
    connect: function (err, result) {
        //We maken een variabele connect aan waar we en functie in plaatsen
        MongoClient.connect(url, function (error, db) {
            //we gaan hier een connect uitvoeren op onze mongoclient naar de locatie die we in onze var url hebben gedeclareerd
            if (error)
                //bij een error
                throw new Error(error);
                    //throw uitvoeren
            this.db = db;
            result(db)
        });
    },

    clearDrone: function (call) {
        //we maken een variabele clearDrone aan waar we een functie in gaan steken
        this.connect(null, function (db) {
            //we gaan hier een connectie naar onze db openen
            db.collection('drones').drop(function (err, result) {
                //we gaan hier een collectie drone(s) droppen
                console.log("Drone is gedropt");
                    //we voeren een console.log uit zodat we duidelijk weten wat er net heeft plaatsgevonden
                db.close();
                        //we sluiten onze connectie naar de db
            });
        })
    },


    insertDrone: function (drone, callback) {
        //we maken een variabele insertDrone waar we een functie in gaan steken
        this.connect(null, function (db) {
            //we gaan hier een connectie naar onze databank openen
            db.collection('drones').insert(drone, function (err, result) {
                //we gaan hier een drone toevoegen aan de collectie
                console.log('Drone toegevoegd');
                //we voeren een console.log uit zodat we duidelijk weten wat er net heeft plaatsgevonden
                db.close();
                //we sluiten onze connectie naar de db
            });
        });
    },

    clearContent: function (call) {
        //we maken een variabele clearContent waar we en functie in gaan steken
        this.connect(null, function (db) {
            //we gaan hier een connectie naar onze databank openen
            db.collection('contents').drop(function (err, result) {
                //we gaan hier een collectie content(s) droppen
                console.log('content is verwijderd');
                //we voeren een console.log uit zodat we duidelijk weten wat er net heeft plaatsgevonden
                db.close();
                //we sluiten onze connectie naar de db
            });
        })
    },
    insertContent: function (content, callback) {
        //we maken een variabele insertContent waar we een functie in gaan steken
        this.connect(null, function (db) {
            //we gaan hier een connectie naar onze databank openen
            db.collection('contents').insert(content, function (err, result) {
                //we gaan hier een content toevoegen aan onze collectie
                console.log('Content is toegevoegd');
                //we voeren een console.log uit zodat we duidelijk weten wat er net heeft plaatsgevonden
                db.close();
                //we sluiten onze connectie naar de db
            });
        });
    },

    clearFile: function (call) {
        //we maken een variabele clearFile waar we een functie in gaan steken
        this.connect(null, function (db) {
            //we gaan hier een connectie naar onze databank openen
            db.collection('files').drop(function (err, result) {
                //we gaan hier een collectie file(s) droppen
                console.log('file(s) verwijderd');
                //we voeren een console.log uit zodat we duidelijk weten wat er net heeft plaatsgevonden
                db.close();
                //we sluiten onze connectie naar de db
            });
        })
    },

    insertFile: function (file, callback) {
        //we maken een variabele insertFile waar we een functie in gaan steken
        this.connect(null, function (db) {
            //we gaan hier een connectie naar onze databank openen
            db.collection('files').insert(file, function (err, result) {
                //we gaan hier een file toevoegen aan onze collectie
                console.log('file(s) toegevoegd');
                //we voeren een console.log uit zodat we duidelijk weten wat er net heeft plaatsgevonden
                db.close();
                //we sluiten onze connectie naar de db
            });
        });
    },

    // 01 Drones //
    getDrones: function (dronesCallback) {
        this.connect(null, function (db) {
            db.collection('drones').find({}).toArray(function (err, doc) {
                drones = doc;
                db.close();
                dronesCallback(drones);
            });
        });
    },
    getDroneByID: function (droneCallback, id) {
        this.connect(null, function (db) {
            db.collection('drones').find({_id: id}).toArray(function (err, doc) {
                drone = doc;
                db.close();
                droneCallback(drone);
            });
        });
    },

    //momenteel als comment staan omdat ik dit nodig had voor mijn validatie op basis van mac adres maar is helaas niet gelukt
    //*getDroneByMac: function (droneCallback, mac) {
    //    this.connect(null, function (db) {
    //        db.collection('drones').find({mac: mac}).toArray(function (err, doc) {
    //            drone = doc;
    //            db.close();
    //            droneCallback(drone);
    //        });
    //    });
    //},

    updateDrones: function (id, update) {
        this.connect(null, function (db) {
            db.collection('drones').update(
                {_id : id},
                { $set : update}
            );
        })
    },


    // 02 Buildings //
    insertBuilding: function (building, callback) {
        this.connect(null, function (db) {
            db.collection('buildings').insert(building, function (err, result) {
               db.close();
            });
        });
    },
    getBuildings: function (buildingsCallback) {
        this.connect(null, function (db) {
            db.collection('buildings').find({}).toArray(function (err, doc) {
                buildings = doc;
                db.close();
                buildingsCallback(buildings);
            });
        });
    },


    getBuildingByName: function (buildingCallback, name) {
    this.connect(null, function (db) {
    db.collection('buildings').find({name: name}).toArray(function (err, doc) {
    building = doc;
    db.close();
    buildingCallback(building);
    });
    });
    },
    // 03 Sensors //
    getSensors: function (sensorsCallback) {
        this.connect(null, function (db) {
            db.collection('sensors').find({}).toArray(function (err, doc) {
                sensors = doc;
                db.close();
                sensorsCallback(sensors);
            });
        });
    },
    getSensorsByDroneID: function (droneSensorsCallback, id) {
        this.connect(null, function (db) {
            db.collection('sensors').find({droneid: id}).toArray(function (err, doc) {
                sensors = doc;
                db.close();
                droneSensorsCallback(sensors);
            });
        });
    },
    getSensorByID: function (sensorCallback, id) {
        this.connect(null, function (db) {
            db.collection('sensors').find({_id: id}).toArray(function (err, doc) {
                sensor = doc;
                db.close();
                sensorCallback(sensor);
            });
        });
    }
};



module.exports = dal;

