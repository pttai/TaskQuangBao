const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const moment = require('moment');
const momentTimezone = require('moment-timezone');
let dateVietNam = momentTimezone(new Date(Date.now()), "Asia/Ho_Chi_Minh").format();


const KetThucChamCong = new Schema({
    "thoigianketthucchamcong": {
        type: Date,
        default: dateVietNam
    },
    "idca":{
        type: ObjectId,
        ref: 'Ca',
        validate: {
            validator: function(idca){
                return ObjectId.isValid(idca);
            },
            message: 'Id ca không hợp lệ'
        }
    },
    "idnhanvien": {
        type: ObjectId,
        ref: 'NhanVien',
        validate: {
            validator: function(idnhanvien){
                return ObjectId.isValid(idnhanvien);
            },
            message: 'Id nhân viên không hợp lệ'
        }
    }
},{timestamps: true, collection: 'KetThucChamCong'});


module.exports = mongoose.model('KetThucChamCong', KetThucChamCong);