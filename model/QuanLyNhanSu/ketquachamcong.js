const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const moment = require('moment');
const momentTimezone = require('moment-timezone');
let dateVietNam = momentTimezone(new Date(Date.now()), "Asia/Ho_Chi_Minh").format();


const KetQuaChamCong = new Schema({
    "ngaycham": {
        type: Date,
        default: dateVietNam
    },
    "dimuon": {
        type: Number,
    },
    'vesom': {
        type: Number
    },
    'sogiolam': {
        type: Number
    },
    'idca':{
        type: ObjectId,
        ref: 'Ca',
        validate: {
            validator: function(idca){
                return ObjectId.isValid(idca);
            },
            message: 'Id ca không hợp lệ'
        }
    },
    'idnhanvien': {
        type: ObjectId,
        ref: 'NhanVien',
        validate: {
            validator: function(idnhanvien){
                return ObjectId.isValid(idnhanvien);
            },
            message: 'Id nhân viên không hợp lệ'
        }
    }
}, {timestamps: true, collection: 'KetQuaChamCong'});

KetQuaChamCong.static('DanhSachChamCong',function(){
    return this.find().populate(
        {
            path: 'idnhanvien',
            select: {
                '_id': 0,
                'tennhanvien': 1
            }
        }
    ).populate({
        path: 'idca',
        select: {
            '_id': 0,
            'tenca': 1
        }
    });
});

module.exports = mongoose.model('KetQuaChamCong', KetQuaChamCong);