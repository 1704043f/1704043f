const db = require("../models");


module.exports = {
    findAll: function (req, res) {
        if(req.user){
            db.Patient_video
            .find({})
            .sort({ "video_datetime": -1 })
            .then(video => res.json(video))
            .catch(err => {
                console.log('CONTROLLER ERROR video find all: ${err}');
                res.status(422).json(err);
            })
        }else{
            res.status(422).json('You do not have proper credential to perform this action.')
        }
        
    },

    findOne: function (req, res) {
        if(req.user){
            db.Patient_video
            .find(req.params.id)
            .sort({ "video_datetime": -1 })
            .then(video => res.json(video))
            .catch(err => {
                console.log('CONTROLLER ERROR video find one: ${err}');
                res.status(422).json(err);
            })
        }else{
            res.status(422).json('You do not have proper credential to perform this action.')
        }
       
    },

    create: function (req, res) {
        if(req.user){
            db.Patient_video.collection
            .insert(req.body)
            .then(video => {
                res.json(video)})
            .catch(err => {
                console.log('CONTROLLER ERROR video create: ${err}');
                res.status(422).json(err);
            })
        }else{
            res.status(422).json('You do not have proper credential to perform this action.')
        }
        
    },
};
