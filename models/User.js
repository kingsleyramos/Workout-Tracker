'use strict';

const mongoose = require("mongoose");
const bcrypt   = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Please enter a username.'] // NOT NULL
  },


  password: {
    type: String,
    trim: true,
    validate: [({ length }) => length >= 6, "Password should be longer."],
    required: [true, 'Please enter a password.'] // NOT NULL
  },

  userCreated: {
    type: Date,
    default: Date.now
  },

  workouts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Workout"
    }
  ]
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
