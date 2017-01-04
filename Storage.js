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
        //we maken hier een variabele getDrones aan waar we een functie in gaan plaatsen met een parameter dronesCallback
        this.connect(null, function (db) {
            //we gaan hier verbinden naar onze db
            db.collection('drones').find({}).toArray(function (err, doc) {
                //we gaan hier kijken in onze collectie drones welke drones er allemaal zijn en in een array plaatsen
                drones = doc;
                db.close();
                //we sluiten onze connectie naar de db
                dronesCallback(drones);
                //we voeren de functie dronesCallback uit
            });
        });
    },
    getDroneByID: function (droneCallback, id) {
        //we maken hier een varaibele getDroneByID aan waar we een functie in gaan plaatsen met als paramters droneCallback en id
        this.connect(null, function (db) {
            //we gaan hier verbinden naar onze db
            db.collection('drones').find({_id: id}).toArray(function (err, doc) {
                //we gaan hier een drone zoeken op een bepaald id in onze collectie en deze in een array plaatsen
                drone = doc;
                db.close();
                //we gaan hier de connectie naar onze db sluiten
                droneCallback(drone);
                //we voeren hier de functie droneCallback uit
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
        //we maken hier een nieuwe variabele aan updateDrones waar we een functie in plaatsen
        this.connect(null, function (db) {
            //we gaan connecteren naar onze databank
            db.collection('drones').update(
                //we gaan update uitvoeren op onze collectie drones
                {_id : id},
                { $set : update}
                //id w meegegeven alsook onze set
            );
        })
    },


    // 02 Buildings //
    insertBuilding: function (building, callback) {
        //we maken hier een variabele aan insertBuilding waar we een functie in gaan plaatsen met de parameters building en callback
        this.connect(null, function (db) {
            //we gaan een connecteren naar onze databank
            db.collection('buildings').insert(building, function (err, result) {
                //we gaan gebouw(en) toevoegen in onze collectie
               db.close();
                //we sluiten de connectie naar onze db
            });
        });
    },
    getBuildings: function (buildingsCallback) {
        //we maken een variabele aan getBuildings waar we een functie in gaan plaatsen met als parameter buildingscallback
        this.connect(null, function (db) {
            //we gaan hier connecteren naar onze db
            db.collection('buildings').find({}).toArray(function (err, doc) {
                //we gaan hier kijken welke buildings er zijn in onze collectie en deze in een array plaatsen
                buildings = doc;
                db.close();
                //we sluiten de connectie naar onze db
                buildingsCallback(buildings);
                //we voeren onze functie buildingscallback uit
            });
        });
    },


    getBuildingByName: function (buildingCallback, name) {
        //we gaan hier een variabele getBuildingByName aanmaken waar we een functie in gaan plaatsen met als parameter buildingsCallback en name
    this.connect(null, function (db) {
        //we gaan hier connecteren naar onze db
    db.collection('buildings').find({name: name}).toArray(function (err, doc) {
        //we gaan hier kijken welk(e) gebouw(en) er zijn (op naam) en vervolgens aan onze array toevoegen
    building = doc;
    db.close();
        //we sluiten de connectie naar onse db
    buildingCallback(building);
        //we voeren de functie buildingCallback uit
    });
    });
    },

//sensor krijgt heeft dezelfde werking als de twee andere storages hierboven voor werking gelieve te kijken bij de twee bovenstaande
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

