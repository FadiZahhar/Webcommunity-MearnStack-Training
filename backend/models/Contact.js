// this file contain the contact model (in database)
const mongoose = require("mongoose");


const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  type: {
    type: String,
    default: "Personal"
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("contacts", ContactSchema);;