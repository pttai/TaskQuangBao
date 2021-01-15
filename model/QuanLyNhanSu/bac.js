const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bac = new Schema({
    "tenbac": {
        type: String,
        required: [true, "Tên bậc không được để trống"],
        ref: 'Bac'
    },
}, {collection: 'Bac'});

Bac.static('LayDanhSachBac', function(){
    return this.find();
});

module.exports = new mongoose.model('Bac', Bac);