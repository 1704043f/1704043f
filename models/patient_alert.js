const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const Patient_alertSchema = new Schema({

    alert_hospnum: {type: String, required: true },
    alert_firstname: {type: String, required: true },
    alert_lastname: {type: String, required: true },
    alert_type: [{
        fall: String, 
        freezing: String,
        choking: String,
        hallucination: String,
    }],
    alert_datetime: {type: Date, required: true },
    alert_physician: String,
    alert_patient_id : String
});

var Patient_alert = mongoose.model("Patient_alert", Patient_alertSchema);

module.exports = Patient_alert;
