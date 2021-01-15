const express = require('express');
const router = express.Router();
const chamcongController = require('../../controller/chamcongController');

//>> Ca
router.route('/danhsachca').get(chamcongController.LayDanhSachCa);
router.route('/laymotca/:id').get(chamcongController.LayMotCa);
router.route('/themmotca').post(chamcongController.ThemMotCa);
router.route('/suamotca/:id').put(chamcongController.SuaCa);
router.route('/xoamotca/:id').delete(chamcongController.XoaMotCa);

//>> CHẤM CÔNG
router.route('/danhsachchamcong').get(chamcongController.LayDanhSachChamCong);
router.route('/ketquatheothang/:thang').get(chamcongController.DanhSachChamCongTheoThang);
router.route('/batdauchamcong').post(chamcongController.BatDauChamCong);
router.route('/ketthucchamcong').post(chamcongController.KetThucChamCong);
module.exports = router;