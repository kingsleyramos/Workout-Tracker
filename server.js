const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("./config/passport");
const session = require('express-session'); 
const path = require('path');

// Assign Port
const PORT = process.env.PORT || 3000;

// Instantiate Server
const app = express();

// setup engine setup
app.set('views', path.join(__dirname, 'views'));

//set up handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Logs request, etc, to terminal
app.use(logger("dev"));

// encodes json and url
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// statically outputs to the client
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Initialize Mongo database named workoutsdb
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutTracker", { useNewUrlParser: true });

// Add routes
require('./routes')(app);

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
