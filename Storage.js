/**
 * Created by yannickvanoekelen on 3/01/17.
 */

/**
 * Created by yannickvanoekelen on 13/11/16.
 */

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

    // 08 MEASUREMENTS
    measurements : {},

    // Create a list of all existing measurements
    listMeasurements : function() {
        var allMeasurements = [];  //Create an empty array to put all measurements in
        for (var item in this.measurements) {
            allMeasurements.push(this.measurements[item]); //Each item that is found, we are adding it to the array
        };
        return allMeasurements; //Output the filled array
    },

    // Search and return for a specific measurement (id specifies the measurement we are looking for)
    searchMeasurements : function(id) {
        return this.measurements[id];
    },

    // Add a (new) measurement
    addMeasurement : function (measurement) {
        this.measurements[measurement.id] = measurement;
    },

};