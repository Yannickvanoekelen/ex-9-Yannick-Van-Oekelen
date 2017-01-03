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
var url = 'mongodb://localhost:27017/prober';

var dal = {
    db : null,

//Hieronder komen stukken terug uit ex-8 met enkele toevoegingen.
    connect: function (err, result) {
        MongoClient.connect(url, function (error, db) {
            if (error)
                throw new Error(error);
            this.db = db;
            result(db)
        });
    },

    clearDrone: function (call) {
        this.connect(null, function (db) {
            db.collection('drones').drop(function (err, result) {
                console.log("collection drones dropped");
                db.close();
            });
        })
    },


    insertDrone: function (drone, callback) {
        this.connect(null, function (db) {
            db.collection('drones').insert(drone, function (err, result) {
                console.log('- Drone Inserted');
                db.close();
            });
        });
    },

    clearContent: function (call) {
        this.connect(null, function (db) {
            db.collection('contents').drop(function (err, result) {
                db.close();
            });
        })
    },
    insertContent: function (content, callback) {
        this.connect(null, function (db) {
            db.collection('contents').insert(content, function (err, result) {
                db.close();
            });
        });
    },

    clearFile: function (call) {
        this.connect(null, function (db) {
            db.collection('files').drop(function (err, result) {
                db.close();
            });
        })
    },

    insertFile: function (file, callback) {
        this.connect(null, function (db) {
            db.collection('files').insert(file, function (err, result) {
                db.close();
            });
        });
    },

    clearFileHeaders: function (call) {
        this.connect(null, function (db) {
            db.collection('filesheaders').drop(function (err, result) {
                db.close();
            });
        })
    },

    insertFileHeader: function (fileheader, callback) {
        this.connect(null, function (db) {
            db.collection('filesheaders').insert(fileheader, function (err, result) {
                db.close();
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
    getDroneByMac: function (droneCallback, mac) {
        this.connect(null, function (db) {
            db.collection('drones').find({mac: mac}).toArray(function (err, doc) {
                drone = doc;
                db.close();
                droneCallback(drone);
            });
        });
    },


    // 02 Buildings //
    insertBuilding: function (building, callback) {
        this.connect(null, function (db) {
            db.collection('buildings').insert(building, function (err, result) {
                console.log('Building Inserted');
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



};