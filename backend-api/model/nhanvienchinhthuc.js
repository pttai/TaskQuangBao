const mongoose = require('mongoose');

const NhanVienChinhThuc = new mongoose.Schema({
  "ngaybatdau":{
    type: Date,
    default: Date.now
  },
  "trangthai":{
    type: String
  }
},{collation: "NhanVienChinhThuc"});

module.exports = mongoose.model("NhanVienChinhThuc", NhanVienChinhThuc);