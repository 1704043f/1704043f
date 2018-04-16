const db = require("../models");

// Methods for Medication collection controller (using Medication model from medication.js)


module.exports = {

    // Fetch personal details of all patients in Patient_data collection (to populate listmenu for doctor use)
    // include their doctor (populate)
    // Returns json list of patients details only (sorted alphabeltically by last_name)

    findAll: function(req, res) {
        db.Patient_data
        .find( {}, {details: 1, appointment: 1, date_created: 1} )
        .populate("physician")
        .sort( {"details.last_name": 1} )
        .then(patientList => { 
            const dateOneWeekAhead = new Date(new Date().getTime()+7*24*60*60*1000).getTime();
            const dateToday = new Date(new Date().getTime()-24*60*60*1000).getTime();
            const apptList = patientList.filter(elem => elem.appointment.next_appt.getTime() > dateToday && elem.appointment.next_appt.getTime() < dateOneWeekAhead);
            
            const dateOneWeekAgo= new Date(new Date().getTime()-7*24*60*60*1000).getTime();
            const patientWeekList = patientList.filter(elem => elem.date_created.getTime() > dateOneWeekAgo);
            myObj = {
                patientsList: patientList,
                apptsList: apptList,
                patientsWeekList: patientWeekList
            }
            res.json(myObj) 
         })
        .catch(err => {
            console.log('CONTROLLER ERROR: ${err}');
            res.status(422).json(err);
         })
    },   


    // NOTE CAN ADD MORE FETCH ROUTES SORTED IN DIFFERENT WAYS SO DOCTOR CAN SELECT HOW TO FIND PATIENT
    // EG. SORTED BY DATE LAST SEEN, SORTED BY PATIENT EMERGENCIES, SORTED BY NEXT APPT DATE ETC, ETC


    // Fetch patient data by id (for doctor use)
    // To be sent req.params.id with _id of patient to be fetched
    // Returns json of patient data 
    findByIdForAdmin: function(req, res) {
        db.Patient_data
        .findById(req.params.id)
        .populate("doctor")
        .then(patient => res.json(patient))
        .catch(err => {
            console.log('CONTROLLER ERROR: ${err}');
            res.status(422).json(err);
        })
    },
    
    // Validate email input by user
    validateEmail: function(req, res){
        db.Patient_data
        .find({"details.email": req.params.email})
        .then(patient => {
            res.json(patient)
            console.log("patient: ", patient);
        })
        .catch(err => {
            console.log('CONTROLLER ERROR : ${err}');
            res.status(422).json(err);
        })
    },

    // Fetch patient details (for patient use)
    // To be sent req.params.id of patient
    // return json of appointment & details field as well as their  doctor details (via a populate)
    findByIdForPatient: function(req, res) {
        console.log(req.params.id);
        db.Patient_data
        .findById(req.params.id, {appointment: 1, details: 1, episode: 1})
        .populate("physician")
        .then(patient => {
            console.log("patient info");
            console.log(patient);
            res.json(patient);
        })
        .catch(err => {
            console.log('CONTROLLER ERROR: ${err}');
            res.status(422).json(err);
        })
    },

    // Fetch episode medication details (for patient use)
    // To be sent req.params.id of patient
    // return json of medications
    patientMeds: function(req, res) {
        console.log("here");
        db.Patient_data
        .findById(req.params.id, {"episode.medications": 1})
        .populate("doctor")
        .then(patient => {
            console.log(patient);
            res.json(patient)
        })
        .catch(err => {
            console.log('CONTROLLER ERROR: ${err}');
            res.status(422).json(err);
        })
    },


    // Adda new patient document
    // To be sent req.body with new patient object {see model}
    // Returns json object of new doctor
    create: function(req, res) {
        //console.log("here: " + req.body.episode[0].record[0].time);
        db.Patient_data.collection
            .insert(req.body)
            .then(patient => res.json(patient))
            .catch(err => {
                console.log('CONTROLLER ERROR: ${err}');
                res.status(422).json(err);
            })
    },



    // Add new episode (for doctor use)
    // To be sent req.params.id with _id of patient and req.body with new episode object {see model}
    // $push pushes new element (in this case a episode object) into array (episode array)
    // Returns ?
    updateEpisode: function(req, res) {
        db.Patient_data
            .findOneAndUpdate(
                { _id: req.params.id },
                { $push: {episode: req.body} }
            )
            .then(episode => res.json(episode))
            .catch(err => {
                console.log('CONTROLLER ERROR: ${err}');
                res.status(422).json(err);
            })
    },



    // Add new record to episode (for patient use)
    // To be sent req.params.id with _id of patient and req.body with new record object {see model}
    // Note application frontend will need to deal with setting date and time of the record
    // Also MongoDb doesn't allow pushing to nested arrays
    // So we have to get the episode array, find its last item, 
    //   --> push a new record onto the last episode's record array, 
    //   --> then replace the old record array with the new one with the new record appended, 
    //   --> then pop off the old episode and push the new one back to the episodes array!
    // Returns ?
    addRecord: function(req,res) {
        db.Patient_data
            .findOne({
                _id: req.params.id}, {"episode": 1}
            )
            .then(result => {
                    let lastEpisode = result.episode[result.episode.length-1]
                    let rec = lastEpisode.record;
                    rec.push(req.body);
                    lastEpisode.record = rec;

                     db.Patient_data
                     .findOneAndUpdate(
                        { _id: req.params.id},
                        { $pop: {"episode": 1} } 
                    )
                    .then(result => 

                        db.Patient_data
                        .findOneAndUpdate(
                            { _id: req.params.id },
                            { $push: {"episode": lastEpisode} }
                        )
                        .then(result => res.json(result))
                    )
            })
            .catch(err => {
                console.log('CONTROLLER ERROR: ${err}');
                res.status(422).json(err);
            })
    },  


    // Update patient email or phone number (other details are generally immutable) (for doctor or patient use)
    // To be sent req.params.id of patient to be updated and req.body with patint email and phone
    // returns ?
    updateContact: function(req, res) {
        db.Patient_data
            .findOneAndUpdate(
                { _id: req.params.id },
                { $set: 
                    {
                    "details.email": req.body.email, 
                    "details.phone": req.body.phone
                    } 
                }
            )
            .then(update => res.json(update))
            .catch(err => {
                console.log('CONTROLLER ERROR: ${err}');
                res.status(422).json(err);
            })
    },

    // Enters/updates physician ID into patient_data collection
    // To be sent req.params.id of patient to be updated and req.body with physician ID
    // returns ?
    updatePatientsDr: function(req, res) {
        console.log("req1" + req.params.id)
        console.log("req2" + req.body.physician)
        db.Patient_data
            .findOneAndUpdate(
                { _id: req.params.id },
                { $set: {"physician": req.body.physician} }
            )
            .then(update => res.json(update))
            .catch(err => {
                console.log('CONTROLLER ERROR: ${err}');
                res.status(422).json(err);
            })
    },


    // Make patient inactive (i.e. if patient leaves programme but want to delete their data) (doctor use only)
    // To be sent req.params.id of patient to be made inactive
    // returns ?
    updateInactivate: function(req, res) {
        db.Patient_data
            .findOneAndUpdate(
                { _id: req.params.id },
                { $set: {"active": false} }
            )
            .then(episode => res.json(episode))
            .catch(err => {
                console.log('CONTROLLER ERROR: ${err}');
                res.status(422).json(err);
            })
    },


    // Update next appointment
    // To be sent req.params.id of patient to be updated and req.body with patient appointment details (for doctor use)
    // returns ?
    updateAppointment: function(req, res) {
        db.Patient_data
            .findOneAndUpdate(
                { _id: req.params.id },
                { $set: {"appointment": req.body} }
            )
            .then(episode => res.json(episode))
            .catch(err => {
                console.log('CONTROLLER ERROR: ${err}');
                res.status(422).json(err);
            })
    },

};