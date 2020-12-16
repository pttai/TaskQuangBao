const mongoose = require('mongoose');
const DanToc = new mongoose.Schema({
  "tendantoc": {
    type: String
  }
}, {collation: "DanToc"});

module.exports = mongoose.model("DanToc", DanToc);