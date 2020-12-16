const mongoose = require('mongoose');
const NhanVien = new mongoose.Schema({
  "tennhanvien": {
    type: String,
  },
  "gioitinh":{
    type: String,
  },
  "sdt": {
    type: String,
  },
  "email": {
    type: String,
  },
  "ngaysinh": {
    type: Date,
    default: Date.now
  },
  "quequan":{
    type: String,
  },
  "idnhanvienchinhthuc":{
    type: mongoose.ObjectId,
  },
  "iddantoc":{
    type: mongoose.ObjectId,
  },
  "idtrinhdo":{
    type: mongoose.ObjectId,
  }
},{collation: "NhanVien"});

module.exports = mongoose.model("NhanVien", NhanVien);