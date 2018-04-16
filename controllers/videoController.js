const db = require("../models");


module.exports = {
    findAll: function (req, res) {
        db.Patient_video
            .find({})
            .sort({ "video_datetime": -1 })
            .then(video => res.json(video))
            .catch(err => {
                console.log('CONTROLLER ERROR video find all: ${err}');
                res.status(422).json(err);
            })
    },

    findOne: function (req, res) {
        db.Patient_video
            .find(req.params.id)
            .sort({ "video_datetime": -1 })
            .then(video => res.json(video))
            .catch(err => {
                console.log('CONTROLLER ERROR video find one: ${err}');
                res.status(422).json(err);
            })
    },

    create: function (req, res) {
        db.Patient_video.collection
            .insert(req.body)
            .then(video => {
                res.json(video)})
            .catch(err => {
                console.log('CONTROLLER ERROR video create: ${err}');
                res.status(422).json(err);
            })
    },
};
