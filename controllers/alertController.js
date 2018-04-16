const db = require("../models");

// Methods for Doctor collection controller (using Medication model from medication.js)


module.exports = { 
    // Fetch all doctor names and _ids (to populate listmenu)
    // Returns json list of doctors names and _ids only (sorted alphabeltically by name
    findAll: function(req, res) {
        db.Patient_alert
           .find({})
           .sort( {"alert_datetime" : -1} )
            .then(emergencies=> res.json(emergencies))
            .catch(err => {
                console.log('CONTROLLER ERROR: ${err}');
                res.status(422).json(err);
            })
    },

    // Add a new doctor
    // To be sent req.body with object of doctor data to be added
    // Returns json of new doctor details
    create: function(req, res) {
        db.Patient_alert.collection
            .insert(req.body)
            .then(emergencies => res.json(emergencies))
            .catch(err => {
                console.log('CONTROLLER ERROR: ${err}');
                res.status(422).json(err);
            })
    },
};
