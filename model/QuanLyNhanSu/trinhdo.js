const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const TrinhDo = new Schema({
    "mabac": {
        type: ObjectId,
        required: [true, "Mã bậc không được để trống"],
        ref: 'Bac'
    },
    "chuyenmon": {
        type: String,
        required: [true, 'Chuyên môn không được để trống']
    }
}, {collection: 'TrinhDo'});

TrinhDo.static('LayDanhSachTrinhDo', function(){
    return this.find();
});

module.exports = new mongoose.model('TrinhDo', TrinhDo);