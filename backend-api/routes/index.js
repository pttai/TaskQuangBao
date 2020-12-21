var express = require('express');
var router = express.Router();
var User = require("../model/QuanLyNhanSu/user");
var NhanVien = require("../model/QuanLyNhanSu/nhanvien");
var DanToc = require("../model/QuanLyNhanSu/dantoc");
var NhanVienChinhThuc = require("../model/QuanLyNhanSu/nhanvienchinhthuc");
var mongoose = require('mongoose');
const user = require('../model/QuanLyNhanSu/user');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/api/helloworld', function (req, res, next) {
  res.json({ sayHi: 'hello from server' });
});

router.get('/api/danhsachnhanvien', function (req, res, next) {
  NhanVien.find()
    .populate('iddantoc') // multiple path names in one requires mongoose >= 3.6
    .exec(function (err, usersDocuments) {
      res.json(usersDocuments);
    });
});

router.post('/api/login', function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  User.find({ username: username, password: password }, (err, data) => {
    res.json(data);
  });
});


router.post('/api/login', function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  User.find({ username: username, password: password }, (err, data) => {
    res.json(data);
  });
  res.end();
});


// THÊM NHÂN VIÊN
router.post('/api/themnhanvien', function (req, res, next) {
  let dataNVCT = {
    ngaybatdau: Date.now(),
    trangthai: req.body.trangthai
  };
  const nhanvienchinhthuc = new NhanVienChinhThuc(dataNVCT);
  nhanvienchinhthuc.save().then(function () {
    NhanVienChinhThuc.findOne().sort({ _id: -1 }).exec(function (err, data) {
      let dataNV = {
        tennhanvien: req.body.tennhanvien,
        gioitinh: req.body.gioitinh,
        sdt: req.body.sdt,
        email: req.body.email,
        ngaysinh: req.body.ngaysinh,
        quequan: req.body.quequan,
        idnhanvienchinhthuc: data._id,
        iddantoc: req.body.iddantoc,
        idtrinhdo: req.body.idtrinhdo
      }
      const nhanvien = new NhanVien(dataNV);
      nhanvien.save();
      (err) ? res.send("Something false") : res.send('create successfuly');
      res.status(201);
      res.end();
    });
  });
});

//Update nhân viên
router.get('/api/suanhanvien/:id', function (req, res, next) {
  let id = req.params.id;
  NhanVien.find({ idnhanvienchinhthuc: id }).populate("idnhanvienchinhthuc").exec((err, data) => {
    (err) ? res.send('Không tìm thấy nhân viên') : res.json(data);
  })
});

router.put('/api/suanhanvien/:id', function (req, res, next) {
  const id = req.params.id;
  NhanVien.findById(id, function (err, data) {
    data.tennhanvien = req.body.tennhanvien;
    data.gioitinh = req.body.gioitinh;
    data.sdt = req.body.sdt;
    data.email = req.body.email;
    data.ngaysinh = req.body.ngaysinh;
    data.quequan = req.body.quequan;
    data.iddantoc = req.body.iddantoc;
    data.idtrinhdo = req.body.idtrinhdo;
    data.save().then(function () {
      NhanVienChinhThuc.findById(data.idnhanvienchinhthuc, (err, data2) => {
        data2.trangthai = req.body.trangthai;
        data2.save().then(function () {
          NhanVien.find({ _id: id }).populate("idnhanvienchinhthuc").exec((err, data) => {
            res.json(data);
            res.end();
          })

        });
      })
    })
      .catch(function (error) {
        res.status(400);
        res.send("Vui lòng kiểm tra lại thông tin!");
      });

  })
});

module.exports = router;
