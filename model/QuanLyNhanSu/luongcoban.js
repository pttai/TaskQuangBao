const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const LuongCoBan = new Schema({

    "mucluong": {
        type: Number,
        required: [true, 'Mức lương không được để trống'],
    },
    "vung": {
        type: Number,
        required: [true, 'Số vùng không được để trống']
    },
}, {collection: "LuongCoBan"});


LuongCoBan.static('LayDanhSachLuongCoBan', function(){
    return this.find();
});

module.exports = new mongoose.model('LuongCoBan', LuongCoBan);