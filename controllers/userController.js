const db = require("../models");
const bcrypt = require('bcryptjs')

module.exports = {

    createUser : function (newUser, callback) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash
            newUser.save(callback)
            })
        })
    },

    getUserByUsername : function (username, callback) {
        var query = {username: username}
        db.User.findOne(query, callback)
    },

    getUserById : function (id, callback) {
        db.User.findById(id, callback)
    },
    comparePassword : function (candidatePassword, hash, callback) {
        bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
            if (err) throw err
            callback(null, isMatch)
        })
    },
    findUserByUsername : function(req, res){
         db.User
        .find({username: req.params.username})
        .then(user => {
            if(user.length > 0){
                res.send("user found in our system");
            }else{
                res.send("username is ok for new account");
            }
        })
        .catch(err => {
            console.log('CONTROLLER ERROR : ${err}');
            res.status(422).json(err);
        })
    },
    getUserByEmail : function(req, res){
         db.User
        .find({email: req.params.email})
        .then(user => {
            console.log("user: ", user);
            if(user.length > 0){
                res.send("user found in our system");
            }else{
                res.send("email is ok for new account");
            }
            
        })
        .catch(err => {
            console.log('CONTROLLER ERROR : ${err}');
            res.status(422).json(err);
        })
    },
};