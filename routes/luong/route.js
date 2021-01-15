const luongController = require('../../controller/luongController');
const express = require('express');
const router = express.Router();

router.route('/danhsachluongcoban').get(luongController.LayDanhSachLuongCoBan);
router.route('/danhsachhesoluong').get(luongController.LayDanhSachHeSoLuong);
router.route('/danhsachbac').get(luongController.LayDanhSachBac);

module.exports = router;