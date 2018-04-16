const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const DoctorSchema = new Schema({

    date_added: {type: Date, default: Date.now},
    name: { first: { type: String, required: true }, last: { type: String, required: true } },
    id_number: {type: String},
    office: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }

});

var Doctor = mongoose.model("Doctor", DoctorSchema);

module.exports = Doctor;