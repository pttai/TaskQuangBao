const mongoose = require('mongoose');

const Ca = new mongoose.Schema({
  "tenca": {
    type: String,
    required: [true, 'Tên ca không được để trống'],
    unique: [true, 'Email đã bị trùng với nhân viên khác'],
  },
  "giobatdau": {
    type: String,
    required: [true, 'Giờ bắt đầu không được để trống']
  },
  "gioketthuc": {
    type: String,
    required: [true, 'Giờ kết thúc không được để trống']
  },
  "batdaunghigiuaca": {
    type: String,
    required: [true, 'Giờ bắt đầu nghỉ giữa ca không được để trống']
  },
  "ketthucnghigiuaca": {
    type: String,
    required: [true, 'Giờ kết thúc nghỉ giữa ca không được để trống']    
  }
}, {timestamps: true, collection: "Ca"});

Ca.static('LayDanhSachCa', function(){
  return this.find();
});

Ca.static("LayMotCa", function(id){
  return this.findOne( {_id: id} );
});
module.exports = mongoose.model("Ca", Ca);