const router = require("express").Router();
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const userController = require("../../controllers/userController");
const db = require("../../models");

// Register User
router.post('/register', function (req, res) {
    console.log("in register user api routes");
    console.log("req.body: ", req.body);
  //var name = req.body.name
  const username = req.body.username;
  const password = req.body.password; 
  const email = req.body.email;
  const role = req.body.role;
  const patient_id = req.body.patient_id;
  const doctor_id = req.body.doctor_id;
  //var password2 = req.body.password2

    var newUser = new db.User({
      username: username,
      password: password,
      email : email,
      role : role,
      patient_id : patient_id,
      doctor_id : doctor_id
    })
    db.User.find({username: newUser.username}, function (err, user) {
      if (err) {throw console.error}else {
        if (user.length > 0) {
          console.log('user exist in database')
          //req.flash('error_msg', 'Username has been taken, pick another one')
          res.status(400).json({
            message : "Username has been taken, please pick a new username"
          })
        }else {
            userController.createUser(newUser, function (err, user) {
            if (err) throw err
            res.status(200).json({
              message: "Username created successfully!"
            })
          })
        }
      }
    })

})


passport.use(new LocalStrategy({passReqToCallback: true},
  function (req,username, password, done) {
    userController.getUserByUsername(username, function (err, user) {
        console.log("User: " , user);
        console.log("Err: " + err);
        console.log("Username : " + username);
      if (err) {return done(null, false, {message: 'Unknown User'});}
      if (!user) {
          //req.authError = "User not found!";
            return done(null, false, {message: 'user not found'});
      }

      userController.comparePassword(password, user.password, function (err, isMatch) {
        if (err) throw err
        if (isMatch) {
            console.log("good password");
            console.log("user", user)
            return done(null, user)
        } else {
            //req.authError="bad password!";
            console.log("bad password!");
            return done(null, false, {message: 'bad password'});
        }
      })
    })
}))
  
passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  userController.getUserById(id, function (err, user) {
    done(err, user)
  })
})
router.get("/isLoggedIn", function(req, res){
  if(!req.user){
    return res.status(401).json({
      message: "You are not logged in. Please login to have access to this page."
    })
  }else{
    return res.status(200).json(req.user);
  }
});
// Matches with "/api/patient/forPatient/:id" A
router 
    .route('/existingUser/:email')
    .get(userController.getUserByEmail)
    
router
    .route('/existingUsername/:username')
    .get(userController.findUserByUsername);
    
router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
        if(req.user){
            res.json(req.user);
        }else{
          console.log("failed");
          res.json("error").statusCode(400);
        }
});

router.get('/logout', function (req, res) {
  req.logout();
  req.session.destroy;
  res.json("log out successfully!");
});


module.exports = router;
