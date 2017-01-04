/**
 * Created by yannickvanoekelen on 3/01/17.
 */
//hulp gekregen van kristof en axel en daar ben ik enorm dankbaar voor//
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//moet er in om het probleem met de certificaten op te lossen

var BASE_URL = "https://web-ims.thomasmore.be/datadistribution/API/2.0";
//url voor naar de api's te gaan
var Settings = function(url) {
    this.url = BASE_URL + url;
//this is hier een verwijzing naar het object.url
    this.method = "GET";
    this.qs = {format: "json"};
//welk formaat je verwacht te krijgen (quick sync)
    this.headers = { authorization: "Basic aW1zOno1MTJtVDRKeVgwUExXZw=="};
//verwijst naar uw http headers, wij geven hier onze authorisatie aan mee
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
//we gaan hier een een variabele drone aanmaken die eigenlijk gaat beschrijven hoe een drone er moet uitzien
//this.id etc = mongodb

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


var request = require("request");
var dal = require("./Storage.js");
//hier laden we /Storage.js in
dal.clearDrone();
dal.clearFile();
dal.clearContent();
//er wordt een functie opgeroepen uit dal

var dronesSettings = new Settings("/drones?format=json");
//we maken een nieuwe variabele droneSettings aan waar we onze nieuwe settings gaan toevoegen in de hoogste rang url /drones
request(dronesSettings, function(error, response, dronesString) {
    //verwijst naar de variabele request op de url droneSettings
    var drones = JSON.parse(dronesString);
    //we gaan onze droneString deftig gaan ontleden in json en in var drones gaan steken
    drones.forEach(function(drone) {
        //elke drone gaan we doorlopen, wat steek je in uw drone (alles wat op dat moment toegangkelijk is via droneSettings)
        var droneSettings = new Settings("/drones/" + drone.id + "?format=json");
        //extra gedeelte toevoegen aan droneSettings zodat je dieper kan om de juiste gegevens te bekomen
        request(droneSettings, function(error, response, droneString) {
            //je gaat een nieuwe request doen omdat je url variabel gaat zijn, denk aan het feit dat er meerdere drone zijn
            var drone = JSON.parse(droneString);
            //we gaan onze dronestring deftig gaan ontleden in json en in onze variabele steken
            dal.insertDrone(new Drone(
                drone.id,
                drone.name,
                drone.mac_address,
                drone.location,
                drone.last_packet_date,
                drone.files,
                drone.files_count
            ));
//Je connecteert naar dal en haalt daar de functie insertDrone op
//vervolgens ga je new drone uitvoeren (functie)
//belangrijk is dat je hier direct gaat wegschrijven naar de databank

//WERKING HIERONDER IS HETZELFDE VOOR UITLEG ZIE HET GEHEEL VAN EEN DRONE TOE TE VOEGEN
            var filesHeaderSettings = new Settings("/files?drone_id.is=" + drone.id + "&format=json");
            request(filesHeaderSettings, function (error, response, fileheadersString) {
                var fileHeaders = JSON.parse(fileheadersString);
                fileHeaders.forEach(function (file) {
                    var filesSettings = new Settings("/files/"+file.id+"?format=json");
                    request(filesSettings, function(error, response, filesString) {
                        var files = JSON.parse(filesString);
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

                        var contentHeadersSettings = new Settings("/files/"+file.id+"/contents?format=json");
                        request(contentHeadersSettings, function (error, response, contentheadersString) {
                            var contentHeaders = JSON.parse(contentheadersString);
                            contentHeaders.forEach(function(content) {
                                var contentSettings = new Settings("/files/"+file.id+"/contents/"+content.id+"?format=json");
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
                                }); // betrekking op onze content request
                            }); // betrekking op onze contentheader for each
                        }); // betrekking op onze content list request
                    }); // betrekking op onze files request
                }); // betrekking op onze fileheader for each
            }); // betrekking op onze file list request
        }); // betrekking op onze dorne detail request
    }); //betrekkign op onze drone for each
}); //betrekking op onze drone list request
console.log("Script running");
