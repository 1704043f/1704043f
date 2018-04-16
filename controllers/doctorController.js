const db = require("../models");

// Methods for Doctor collection controller (using Medication model from medication.js)


module.exports = { 

    
    // Fetch all doctor names and _ids (to populate listmenu)
    // Returns json list of doctors names and _ids only (sorted alphabeltically by name
    findAll: function(req, res) {
        db.Doctor
           .find({})
           .sort( {"name.last" : 1} )
            .then(doctorList=> res.json(doctorList))
            .catch(err => {
                console.log('CONTROLLER ERROR: ${err}');
                res.status(422).json(err);
            })
    },


    // Fetch doctor details by id
    // To be sent req.params.id with _id of doctor to be fetched
    // Returns json of doctor details
    findById: function(req, res) {
        db.Doctor
            .findById(req.params.id)
            .then(doctor => res.json(doctor))
            .catch(err => {
                console.log('CONTROLLER ERROR: ${err}');
                res.status(422).json(err);
            })
    },


    // Add a new doctor
    // To be sent req.body with object of doctor data to be added
    // Returns json of new doctor details
    create: function(req, res) {
        db.Doctor.collection
            .insert(req.body)
            .then(doctor => res.json(doctor))
            .catch(err => {
                console.log('CONTROLLER ERROR: ${err}');
                res.status(422).json(err);
            })
    },


    // Remove a doctor
    // To be sent req.params.id of doctro to be deleted
    // Returns ?_id of deleted doctor
    remove: function(req, res) {
        db.Doctor
            .findById({ _id: req.params.id })
            .then(doctor => doctor.remove())
            .then(doctor => res.json(doctor))
            .catch(err => {
                console.log('CONTROLLER ERROR: ${err}');
                res.status(422).json(err);
            })
    },

    // Update a doctors details
    // To be sent req.params.id of doctor to be updated & req.body object of doctor's new details
    update: function(req, res) {
        console.log("reqid " + req.params.id)
        console.log("reqdate " + req.body.date_added)
        console.log("reqnum " + req.body.id_number)
        console.log("reqoffice" + req.body.office)
        console.log("reqemail " + req.body.email)
        console.log("reqphone " + req.body.phone)

        db.Doctor
            .findOneAndUpdate(
                { _id: req.params.id },
               req.body
            )
            .then(doctor => res.json(doctor))
            .catch(err => {
                console.log('CONTROLLER ERROR: ${err}');
                res.status(422).json(err);
            })
    },

    // Validate email input by user
    validateEmail: function(req, res){
        db.Doctor
        .find({email: req.params.email})
        .then(doctor => {
            res.json(doctor)
            console.log("doctor: ", doctor);
        })
        .catch(err => {
            console.log('CONTROLLER ERROR : ${err}');
            res.status(422).json(err);
        })
    }

};
