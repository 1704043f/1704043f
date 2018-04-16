const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// Database name = 'medmonitordb'
// This file empties the respective collections and inserts the seed data below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/medmonitordb",
  {
    useMongoClient: true
  }
);

// Video collection seeds

const patient_videoSeed = [
    {

        patient_id: "5acbf5f01b7ac91a6c55a270",
        video_link: "https://www.youtube.com/watch?v=9y8BCL8ywnk",
        video_datetime: new Date()
    }
]

db.Patient_video
  .remove({})
  .then(() => db.Patient_video.collection.insertMany(patient_videoSeed))
     .then(data => {
      console.log(data.insertedIds.length + " patient_video records inserted!");

  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });