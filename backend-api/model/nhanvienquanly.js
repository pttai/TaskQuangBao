const mongoose = require('mongoose');
const NhanVienQuanLy = new mongoose.Schema({
  "iduser": {
    type: mongoose.ObjectId
  },
  "idnhanvienchinhthuc":{
    type: mongoose.ObjectId
  },
  "idchucvu": {
    type: mongoose.ObjectId
  }
},{collation: "NhanVienQuanLy"})

module.exports = mongoose.model("NhanVienQuanLy", NhanVienQuanLy);