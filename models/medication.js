const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const MedicationSchema = new Schema({

        
    name: { type: String, required: true },
    type: String,
    doses: [ { dose: String, form: String, route: String} ]

});

var Medication = mongoose.model("Medication", MedicationSchema);

module.exports = Medication;
