const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const Patient_videoSchema = new Schema({

    patient_id: { type: String, required: true },
    video_link: { type: String, required: true },
    video_datetime: { type: Date, required: true }
});

var Patient_video = mongoose.model("Patient_video", Patient_videoSchema);

module.exports = Patient_video;
