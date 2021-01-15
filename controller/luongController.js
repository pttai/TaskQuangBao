const asyncMiddleware = require('../middlewares/asyncMiddleware');
const errorResponse = require('../model/response/error');
const successResponse = require('../model/response/success');

const LuongCoBan = require('../model/QuanLyNhanSu/luongcoban');
const HeSoLuong = require('../model/QuanLyNhanSu/hesoluong');
const Bac = require('../model/QuanLyNhanSu/bac');

exports.LayDanhSachLuongCoBan = asyncMiddleware(async(req, res, next) => {
    let luongcoban = await LuongCoBan.LayDanhSachLuongCoBan();
    res.status(200).json(new successResponse(200, luongcoban, 'Successful'));
});


exports.LayDanhSachHeSoLuong = asyncMiddleware(async(req, res, next) => {
    let hesoluong = await HeSoLuong.LayDanhSachHeSoLuong();
    res.status(200).json(new successResponse(200, hesoluong, 'Successful'));
});


exports.LayDanhSachBac = asyncMiddleware(async(req, res, next) => {
    let bac = await Bac.LayDanhSachBac();
    res.status(200).json(new successResponse(200, bac, 'Successful'));
});


