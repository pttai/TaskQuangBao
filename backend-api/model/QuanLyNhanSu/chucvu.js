const mongoose = require('mongoose');
const ChucVu = new mongoose.Schema({
  "tenchucvu": {
    type: String,
  },
  "tenvitri": {
    type: String
  }
},{collection: "ChucVu"});
module.exports = mongoose.model("ChucVu", ChucVu);