const asyncMiddleware = require('../middlewares/asyncMiddleware');
const Ca = require('../model/QuanLyNhanSu/ca');
const NhanVien = require('../model/QuanLyNhanSu/nhanvien');
const KetQuaChamCong = require('../model/QuanLyNhanSu/ketquachamcong');
const BatDauChamCong = require('../model/QuanLyNhanSu/batdauchamcong');
const KetThucChamCong = require('../model/QuanLyNhanSu/ketthucchamcong');
const SuccessResponse = require('../model/response/success');
const ErrorResponse = require('../model/response/error');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Helper = require('../helper/helper');

const moment = require('moment');
const ISODate = moment.ISO_8601;
const momentTimezone = require('moment-timezone');


//>> DANH SÁCH CHẤM CÔNG THEO THÁNG
exports.DanhSachChamCongTheoThang = asyncMiddleware(async (req, res, next) => {

	const { thang } = req.params;
	
	let danhsachchamcong = await KetQuaChamCong.aggregate([
		{$addFields: {  "month" : {$month: '$ngaycham'}}},
		{
			"$match": { month: Number.parseInt(thang)}
		},
		{
			"$group": {
				"_id": "$idnhanvien" ,
				"tongthoigian": { $sum: { $multiply: "$sogiolam" } },
				"thongtinnhanvien": { $first: "$idnhanvien" },
			}
		},
		{
			"$lookup": {
				"from": "NhanVien",
				"localField": "thongtinnhanvien",
				"foreignField": "_id",
				"as": "tennhanvien"
			}
		},

	]);
	res.status(200).json(new SuccessResponse(200, danhsachchamcong, 'Successful'));
});

//>> LẤY DANH SÁCH CHẤM CÔNG
exports.LayDanhSachChamCong = asyncMiddleware(async (req, res, next) => {
	let danhsachchamcong = await KetQuaChamCong.DanhSachChamCong();
	res.status(200).json(new SuccessResponse(200, danhsachchamcong, 'Successful'));
});

//>> BẮT ĐẦU CHẤM CÔNG
exports.BatDauChamCong = asyncMiddleware(async (req, res, next) => {
	let { idca, idnhanvien } = req.body;

	let batdauchamcong = new BatDauChamCong({
		idca: idca,
		idnhanvien: idnhanvien
	});

	let rs = await batdauchamcong.save(function (err, data) {
		if (err)
			res.status(404).json(new ErrorResponse(404, err));
		else {
			res.status(200).json(new SuccessResponse(200, data, 'Chấm công thành công'));
		}
	});


});

//>> KẾT THÚC CHẤM CÔNG
exports.KetThucChamCong = asyncMiddleware(async (req, res, next) => {
	let { idca, idnhanvien } = req.body;
	let ketthucchamcong = new KetThucChamCong({
		idca: idca,
		idnhanvien: idnhanvien
	});

	//Lấy thời gian bắt đầu chấm công mới nhất của nhân viên
	let thoigianbatdau = await BatDauChamCong.findOne({
		idnhanvien: idnhanvien,

	}).sort({
		'createdAt': -1,
	});



	//Xử lý khi chưa bắt đầu chấm công
	if(Helper.CompareTwoDate(thoigianbatdau.thoigianbatdauchamcong, new Date(Date.now())) != 0)
		res.status(404).json(new ErrorResponse(404, 'Bạn phải chấm công trước'));
	else{
		let rs = await ketthucchamcong.save(function (err, data) {
			if (err) {
				res.status(404).json(new ErrorResponse(404, 'Không thể chấm công'));
				res.end();
			}
			else {
				res.status(200).json(new SuccessResponse(200, data, 'Chấm công thành công'));
			}
		});
	}
	
	//Lấy thời gian kết thúc chấm công mới nhất của nhân viên
	let thoigianketthuc = await KetThucChamCong.findOne(
		{
			idnhanvien: idnhanvien
		}
	).sort({
		'createdAt': -1,
	});

	// Xử lý định dạng ngày tháng
	let batdau = Helper.convertFullHour(thoigianbatdau.thoigianbatdauchamcong);
	let ketthuc = Helper.convertFullHour(thoigianketthuc.thoigianketthucchamcong);
	let resultBatDau = Helper.CompareTwoDate(thoigianbatdau.thoigianbatdauchamcong, new Date(Date.now()));
	let resultKetThuc = Helper.CompareTwoDate(thoigianketthuc.thoigianketthucchamcong, new Date(Date.now()));


	var _tgbatdau = moment([batdau.hours, batdau.minutes], "HH:mm");
	var _tgketthuc = moment([ketthuc.hours, ketthuc.minutes], "HH:mm");

	let tongcong = _tgketthuc.diff(_tgbatdau, 'hours');


	let ketquachamcong = await KetQuaChamCong.findOne({idnhanvien: idnhanvien});

	// Xử lý khi chấm công ngày hiện tại & trùng mã nhân viên
	if (resultBatDau == 0 && resultKetThuc == 0 && ketquachamcong != null) {
		let ketquachamcong = await KetQuaChamCong.findOneAndUpdate(
			{
				idnhanvien: idnhanvien
			},
			{
				$set: {
					sogiolam: tongcong,
					idca: thoigianbatdau.idca,
					idnhanvien: idnhanvien
				}
			}
		).sort({
			'createdAt': -1,
		});
	}
	// Xử lý khi khác mã nhân viên
	else {
		let ketquamoi = new KetQuaChamCong({
			sogiolam: tongcong,
			idca: thoigianbatdau.idca,
			idnhanvien: idnhanvien
		});
		let saveKetQua = await ketquamoi.save();
	}


});

//>> LẤY DANH SÁCH CA
exports.LayDanhSachCa = asyncMiddleware(async (req, res, next) => {
	let danhsachca = await Ca.LayDanhSachCa();
	res.status(200).json(new SuccessResponse(200, danhsachca, 'Successful'));
});

//>> LẤY THÔNG TIN MỘT CA
exports.LayMotCa = asyncMiddleware(async (req, res, next) => {
	let { id } = req.params;
	if (ObjectId.isValid(id)) {
		let motca = await Ca.LayMotCa(id);
		res.status(200).json(new SuccessResponse(200, motca, 'Successful'));
	}
	else {
		res.status(404).json(new ErrorResponse(404, 'Không tìm thấy ca'));
		res.end();
	}
});

//>> THÊM MỘT CA
exports.ThemMotCa = asyncMiddleware(async (req, res, next) => {
	let { tenca, giobatdau, gioketthuc, batdaunghigiuaca, ketthucnghigiuaca } = req.body;

	let caMoi = new Ca({
		tenca: tenca,
		giobatdau: giobatdau,
		gioketthuc: gioketthuc,
		batdaunghigiuaca: batdaunghigiuaca,
		ketthucnghigiuaca: ketthucnghigiuaca
	});


	let rs = await caMoi.save(function (err, data) {
		if (err) {
			res.status(404).json(new ErrorResponse(404, err));
			res.end();
		} else {
			res.status(200).json(new SuccessResponse(200, data, 'Thêm thành công'));
		}

	});



});

//UPDATE THÔNG TIN MỘT CA
exports.SuaCa = asyncMiddleware(async (req, res, next) => {
	let { id } = req.params;
	let {
		tenca,
		giobatdau,
		gioketthuc,
		batdaunghigiuaca,
		ketthucnghigiuaca
	} = req.body;


	let ca = await Ca.findByIdAndUpdate(id, {
		tenca: tenca,
		giobatdau: giobatdau,
		gioketthuc: gioketthuc,
		batdaunghigiuaca: batdaunghigiuaca,
		ketthucnghigiuaca: ketthucnghigiuaca
	}, function (err) {
		if (err) {
			res.status(404).json(new ErrorResponse(404, 'Something false'));
			res.end();
		}
	});
	res.status(200).json(new SuccessResponse(200, ca, 'Update Successful'));
	res.end();
});

//XÓA MỘT CA
exports.XoaMotCa = asyncMiddleware(async (req, res, next) => {
	const { id } = req.params;
	let ca = await Ca.find({ _id: id });
	if (ObjectId.isValid(id) && ca.length != 0) {
		let ca = await Ca.findByIdAndDelete(id);
		res.status(200).json(new SuccessResponse(200, ca, 'Xóa thành công'));
	} else {
		res.status(404).json(new ErrorResponse(404, 'Không thể xóa nhân viên'));
		res.end();
	}

});

