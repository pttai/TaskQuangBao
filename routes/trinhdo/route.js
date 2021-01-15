const express = require('express');
const router = express.Router();
const trinhdoController = require('../../controller/trinhdoController');

router.route('/danhsachtrinhdo').get(trinhdoController.LayDanhSachTrinhDo);
router.route('/themtrinhdo').post(trinhdoController.ThemTrinhDo);
router.route('/suatrinhdo/:id').put(trinhdoController.SuaTrinhDo);
router.route('/xoatrinhdo/:id').delete(trinhdoController.XoaTrinhDo);

module.exports = router;