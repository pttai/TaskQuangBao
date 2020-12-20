const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NhanVienQuanLy = new mongoose.Schema({
  "iduser": {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  "idnhanvienchinhthuc":{
    type: Schema.Types.ObjectId, ref: 'NhanVienChinhThuc'
  },
  "idchucvu": {
    type: Schema.Types.ObjectId, ref: 'ChucVu'
  }
},{collection: "NhanVienQuanLy"})

module.exports = mongoose.model("NhanVienQuanLy", NhanVienQuanLy);