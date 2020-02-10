const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

// Telling passport we want to use a Local Strategy. In other words, awe want login with a username/email and pssword
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  // {
  //   usernameField: "username",
  // },
  function(username, password, done) {
    User.findOne({ username :  username }, function(err, user) {
      // if there are any errors, return the error before anything else
      //console.log(user);

      if (err)
          return done(err);

      // if no user is found, return the message
      if (!user){
          //console.log("USER IS NULL");
          return done(null, false, {
            message: "incorrect username"
          });
         } // req.flash is the way to set flashdata using connect-flash

      // if the user is found but the password is wrong
      if (!user.validPassword(password))
          return done(null, false, {
            message: "incorrect password"
          }); // create the loginMessage and save it to session as flashdata

      // all is well, return successful user
      return done(null, user);
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;