/**
 * Created by yannickvanoekelen on 3/01/17.
 */

/**
 * Created by yannickvanoekelen on 13/11/16.
 */

//Add the moment there are only 2 storages declared, I have a good idea about what I'm going to do with my data
//But I'm thinking what storages I really need to use, so work in progress this area

module.exports = {

    // In this project we are using 8 resources
    // 1 --> DRONES
    // 2 --> BUILDINGS
    // 3 --> SENSORS
    // 4 --> LOCATIONS
    // 5 --> EVENTS
    // 6 --> PEOPLE
    // 7 --> COURSES
    // 8 --> MEASUREMENTS



    // 01 DRONES
    drones : {},

    // Create a list of all existing drones
    listDrones : function() {
        var allDrones = [];  //Create an empty array to put all drones in
        for (var item in this.drones) {
            allDrones.push(this.drones[item]); //Each item that is found, we are adding it to the array
        };
        return allDrones; //Output the filled array
    },

    // Search and return for a specific drone (id specifies the drone we are looking for)
    searchDrones : function(id) {
        return this.drones[id];
    },

    // Add a (new) drone
    addDrone : function (drone) {
        this.drones[drone.id] = drone;
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