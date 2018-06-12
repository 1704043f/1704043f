const db = require("../models");

// Methods for Medication collection controller (using Medication model from medication.js)


module.exports = {

    // Fetch all medications and doses
    // Returns json list of all medications sorted alphabetically by name
    findAll: function(req, res) {
        if(req.user){
            console.log("findAll");
            db.Meds
                .find()
                .sort( {name: 1} )
                .then(medicationList => res.json(medicationList))
                .catch(err => {
                    console.log('CONTROLLER ERROR: ${err}');
                    res.status(422).json(err);
                })
        }else{
            res.status(422).json('You do not have proper credential to perform this action.')
        }
        
    },
    
    //Find drug by name
    findOne : function(req, res){
        if(req.user){
            console.log("findOne");
            db.Meds
                .find({_id : req.params.id})
                .then(med => {
                    console.log("med : ", med);
                    res.json(med);
                })
                .catch(err => res.status(422).json(err));
        }else{
            res.status(422).json('You do not have proper credential to perform this action.')
        }
        
        
    },

    // Add a new medication
    // To be sent req.body object with name(required), type(optional), doses(optional) array ( [dose, form, route] )
    // Returns added medication 
    create: function(req, res) {
        if(req.user){
            console.log("create");
            db.Meds.collection
                .insert(req.body)
                .then(medication => res.json(medication))
                .catch(err => {
                    console.log('CONTROLLER ERROR: ${err}');
                    res.status(422).json(err);
                })
        }else{
            res.status(422).json('You do not have proper credential to perform this action.')
        }
        
    },


    // Add new dose to an existing medication
    // To be sent req.params.id with _id of medication and req.body with doses object {dose, form, route }
    // Note $addToSet only adds the new item if it is doesn't already exist (avoids duplicates)
    // Returns ?
    updateDose: function(req, res) {
        if(req.user){
            console.log("updateDose: " +  req.params.id + " | " + req.body.dose)
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
        }else{
            res.status(422).json('You do not have proper credential to perform this action.')
        }
        
    },


    // Delete a medication
    // To be sent req.params.id with _id of medication to be deleted
    // Returns ?_id of medication deleted
    removeDrug: function(req, res) {
        if(req.user){
            console.log("removeDrug: " +  req.params.id + " | " + req.body)
            db.Meds
                .findById({ _id: req.params.id })
                .then(medication => medication.remove())
                .then(medication => res.json(medication))
                .catch(err => {
                    console.log('CONTROLLER ERROR: ${err}');
                    res.status(422).json(err);
                })
        }else{
            res.status(422).json('You do not have proper credential to perform this action.')
        }
        
    },


    // Delete a dose  from an existing medication
    // To be sent req.params.id with _id of medication and req.body with doses object {dose, form, route } to be removed
    // Note $pull will remove an element from an array where that element matches a supplied element, in this case a doses object
    // Returns ?
    removeDose: function(req, res) {
        if(req.user){
            console.log("deleteDose: " +  req.params.id + " | " + req.body.dose)
            db.Meds
                .findOneAndUpdate(
                    { _id: req.params.id },
                    { $pull: {"doses": req.body }},
                    { multi: true }
                )
                .then(medication => res.json(medication))
                .catch(err => {
                    console.log('CONTROLLER ERROR: ${err}');
                    res.status(422).json(err);
                })
        }else{
            res.status(422).json('You do not have proper credential to perform this action.')
        }
    }

};





