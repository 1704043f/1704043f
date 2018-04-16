const express = require("express");
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const {google} = require('googleapis');
const mailer = require("./mailer");
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io', { transports: ['websocket'] });

var config = require('config');

app.use(cors());
// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

let secret = config.get("SESSION_SECRET");
app.use(session({
  secret: secret,
  saveUninitialized: false,
  resave: false,
  cookie: {_expires: 600000000 }
}))

app.use(passport.initialize());
// Connect Flash
app.use(flash());
app.use(passport.session());


// Serve up static assets
app.use(express.static("client/build"));

// Add routes, both API and view
app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB 'medmonitordb'
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/medmonitordb",
  {
    useMongoClient: true
  }
);


// Express Validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

app.use(function(req, res, next){
  res.locals.success_message = req.flash('success_message');
  res.locals.error_message = req.flash('error_message');
  res.locals.message = req.session.message || '';
  next();
});

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
  console.log('User connected');
  socket.on("alertAdmin", data => {
    io.sockets.emit("alertAdmin", `Patient '${data.name}' of hospital number ${data.hospitalNum} reported a risky incident of ${data.emergencies} at ${data.date}`);
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
})

server.listen(PORT, () => console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`));

// Start the API server