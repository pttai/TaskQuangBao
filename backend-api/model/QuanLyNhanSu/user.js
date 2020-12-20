const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username : {
    type: String,
  },
  password : {
    type: String,
  },
  role : {
    type: String
  },
 
},{collection:"User"});

module.exports = mongoose.model("User", User);
