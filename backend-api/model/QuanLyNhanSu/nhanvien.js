const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
    type: Schema.Types.ObjectId, ref: 'NhanVienChinhThuc',
  },
  "iddantoc":{
    type: Schema.Types.ObjectId, ref: 'DanToc',
  },
  "idtrinhdo":{
    type: Schema.Types.ObjectId,
  }
},{timestamps: true, collection: "NhanVien"});

module.exports = mongoose.model("NhanVien", NhanVien);