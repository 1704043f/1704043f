const db = require("../models");

// Methods for Medication collection controller (using Medication model from medication.js)


module.exports = {

    // Fetch all medications and doses
    // Returns json list of all medications sorted alphabetically by name
    findAll: function(req, res) {
        console.log("findAll");
        db.Meds
            .find()
            .sort( {name: 1} )
            .then(medicationList => res.json(medicationList))
            .catch(err => {
                console.log('CONTROLLER ERROR: ${err}');
                res.status(422).json(err);
            })
    },
    
    //Find drug by name
    findOne : function(req, res){
        console.log("findOne");
        db.Meds
            .find({name : req.params.name})
            .then(med => {
                console.log("here");
                console.log("med : ", med);
                res.json(med);
            })
            .catch(err => res.status(422).json(err));
    },

    // Add a new medication
    // To be sent req.body object with name(required), type(optional), doses(optional) array ( [dose, form, route] )
    // Returns added medication 
    create: function(req, res) {
        console.log("req", req.body);
        db.Meds.collection
            .insert(req.body)
            .then(medication => res.json(medication))
            .catch(err => {
                console.log('CONTROLLER ERROR: ${err}');
                res.status(422).json(err);
            })
    },


    // Add new dose to an existing medication
    // To be sent req.params.id with _id of medication and req.body with doses object {dose, form, route }
    // Note $addToSet only adds the new item if it is doesn't already exist (avoids duplicates)
    // Returns ?
    updateDose: function(req, res) {
        console.log("req " +  req.params.id + " : " + req.body)
        db.Meds
            .findOneAndUpdate(
                { _id: req.params.id },
                { $addToSet: {doses: req.body} }
            )
            .then(medication => res.json(medication))
            .catch(err => {
                console.log('CONTROLLER ERROR: ${err}');
                res.status(422).json(err);
            })
    },


    // Delete a medication
    // To be sent req.params.id with _id of medication to be deleted
    // Returns ?_id of medication deleted
    removeDrug: function(req, res) {
        db.Meds
            .findById({ _id: req.params.id })
            .then(medication => medication.remove())
            .then(medication => res.json(medication))
            .catch(err => {
                console.log('CONTROLLER ERROR: ${err}');
                res.status(422).json(err);
            })
    },


    // Delete a dose  from an existing medication
    // To be sent req.params.id with _id of medication and req.body with doses object {dose, form, route } to be removed
    // Note $pull will remove an element from an array where that element matches a supplied element, in this case a doses object
    // Returns ?
    removeDose: function(req, res) {
        db.Meds
            .findOneAndUpdate(
                { _id: req.params.id },
                { $pull: {doses: req.body} }
            )
            .then(medication => res.json(medication))
            .catch(err => {
                console.log('CONTROLLER ERROR: ${err}');
                res.status(422).json(err);
            })
    }

};





