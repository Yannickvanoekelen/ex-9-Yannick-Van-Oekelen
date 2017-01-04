/**
 * Created by yannickvanoekelen on 4/01/17.
 */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//verhelpt het probleem met de certificaten

var BASE_URL = "https://web-ims.thomasmore.be/datadistribution/API/2.0";
//url voor naar api's te gaan
var Settings = function(url) {
    this.url = BASE_URL + url;
//this is een verwijzing naar settings.url
    this.method = "GET";
    this.qs = {format: "json"};
//welk formaat je verwacht te krijgen (quick sync)
    this.headers = { authorization: "Basic aW1zOno1MTJtVDRKeVgwUExXZw=="};
};

var Drone = function(id, name, macA, loc, lastpada, files, filesCount) {
    this.id = id;
    this.name = name;
    this.mac_address = macA;
    this.location = loc;
    this.last_packet_date = lastpada;
    this.files = files;
    this.files_count = filesCount;
};
//hier gaan we de variabele drone aanmaken die eigenlijk een beschrijving geeft hoe een drone er moet uitzien (blueprint)
//this.id (etc) zijn diegenen van mongodb


var Content = function(id, macA, url, datetime, ref, rssi) {
    this.id = id;
    this.mac_address = macA;
    this.url = url;
    this.datetime = datetime;
    this.ref = ref;
    this.rssi = rssi;
};

var File = function(fid, dateFirstRecord, dateLastRecord, dateLoaded, cont, contentsCount, url, ref) {
    this.file_id = fid;
    this.date_first_record = dateFirstRecord;
    this.date_last_record = dateLastRecord;
    this.date_loaded = dateLoaded;
    this.contents = cont;
    this.contents_count = contentsCount;
    this.url = url;
    this.ref = ref;
};

// hulp gekregen van henzo bij deze install request van save

var dronesSettings = new Settings("/drones?format=json");
//Eerste aanpassing aan url omdat uw basis url geen data gaat opleveren, hiermee gaan we naar drones gaan (dieper)
var request = require("request");
var dal = require("./Storage.js");
//je gaat de file Storage.js inladen
dal.clearDrone();
dal.clearFile();
dal.clearContent();
//hier worden functies opgeroepen uit onze dal


request(dronesSettings, function(error, response, dronesString) {
    //verwijst naar de variabele request op de url dronesettings
    var drones = JSON.parse(dronesString);
    //we gaan onze dronestring deftig gaan ontleden in json en in een var drones gaan steken
    drones.forEach(function(drone) {
        //elke drone gaan doorlopen, wat steek je in uw drone (alles wat teogangkelijk is in uw drones (droneSettings)
        var droneSettings = new Settings("/drones/" + drone.id + "?format=json");
        //extra gedeelte toevoegen aan droneSettings zodat je dieper in de drone kan gaan
        request(droneSettings, function(error, response, droneString) {
            //Je gaat een nieuwe request doen omdat je url variabel gaat zijn denk aan het feit dat er meerdere drones zijn
            var drone = JSON.parse(droneString);
            //we gaan onze dronestring deftig gaan ontleden in json en in var drones gaan steken
            dal.insertDrone(new Drone(
                drone.id,
                drone.name,
                drone.mac_address,
                drone.location,
                drone.last_packet_date,
                drone.files,
                drone.files_count
            ));
            var contentSettings = new Settings("/files/" + file.id + "/contents?format=json&embed");
            request(contentSettings, function(error, response, contentString) {
                var content = JSON.parse(contentString);
                dal.insertContent(new Content(
                    content.id,
                    content.mac_address,
                    content.url,
                    content.datetime,
                    content.ref,
                    content.rssi
                ));
                var filesSettings = new Settings("/files?drone_id.is=" +
                    drone.id + "&format=json&date_loaded.greaterOrEqual=2016-12-07T12:00:00");
                request(filesSettings, function(error, response, filesString) {
                    var files = JSON.parse(filesString);
                    files.forEach(function(file) {
                        var fileSettings = new Settings("/files/" + file.id + "?format=json");
                        request(fileSettings, function(error, response, fileString) {
                            var file = JSON.parse(fileString);
                            dal.insertFile(new File(
                                file.file_id,
                                file.date_first_record,
                                file.date_last_record,
                                file.date_loaded,
                                file.contents,
                                file.contents_count,
                                file.url,
                                file.ref
                            ));
                        });
                    });
                });
            });
        });
    });
});
console.log("Script running");
