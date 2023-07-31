// this file contain the user model (in database)
const mongoose = require("mongoose");


/*
 * this will create a schema for User in mongo database
 * each User row entry has: name, email, password and reg_date 
 * 
 * each column in schema has its options which are:
 *  . DataType 'type': it's required to specify, can be most of JS types
 *  . 'required': if true, entry must have a value (not null)
 *  . 'unique': if true, duplications of column entries are restricted
 *  . 'default': add a default value automatically if not specified
**/
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  reg_date: {
    type: Date,
    default: Date.now
  }
});


// finally, create the User model using mongoose.model function and export it
module.exports = mongoose.model("user", UserSchema);