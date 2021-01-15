const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const HeSoLuong = new Schema({
    "mucheso": {
        type: Number,
        required: [true, 'Mức hệ số không được để trống']
    },
    "idbac": {
        type: ObjectId,
        required: [true, 'Id bậc không được để trống'],
        ref: 'Bac'
    }
}, {collection: "HeSoLuong"});


HeSoLuong.static('LayDanhSachHeSoLuong', function(){
    return this.find();
});


module.exports = new mongoose.model('HeSoLuong', HeSoLuong);