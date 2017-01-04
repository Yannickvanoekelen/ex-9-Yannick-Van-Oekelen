/**
 * Created by yannickvanoekelen on 3/01/17.
 */
module.exports = {

    fieldsNotEmpty: function (object) {
        //dit is de initialisatie van de functie fieldsNotEmpty die een object moet krijgen als parameter
        var errors = [];
        //aanmaak van een array waar errors in opgeslagen worden
        for (i = 1; i < arguments.length; i++) {
            //initialisatie van de teller met een object argumenten
            //belagnrijk hierbij is dat het een array bevat wanneer de functie werd opgeroepen
            if (!this.fieldNotEmpty(object, arguments[i])) {
                //We gaan hier kijken voor elke waarde of wat de response is van FieldNotEmpty (true or false)
                errors.push(arguments[i]);
                //We vullen de array (errors) op met de argumenten (de parameters in dit geval)
            }
        };
        return errors.length === 0 ? null : errors;
        //Wanneer de lengte van de errors 0 is, gaan we niks returnen andes gaan we errors returnen
    },

    fieldNotEmpty: function (object, field) {
        //initialisatie van de functie fieldNotEmpty die een object gaat moeten krijgen en die in een veld moet staan
        return object && object[field] && object[field] !== "";
        //Wanneer er een object is en het veld w gevonden en is niet leeg (van dat object) dan gaan we een true returnen
    }

};