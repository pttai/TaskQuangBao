const mongoose = require('mongoose');
const ChucVu = new mongoose.Schema({
  "tenchucvu": {
    type: String,
  },
  "tenvitri": {
    type: String
  }
},{collation: "ChucVu"});
module.exports = mongoose.model("ChucVu", ChucVu);