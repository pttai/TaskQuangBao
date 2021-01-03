var express = require('express');
var router = express.Router();
var User = require("../model/QuanLyNhanSu/user");
var NhanVien = require("../model/QuanLyNhanSu/nhanvien");
var NhanVienChinhThuc = require("../model/QuanLyNhanSu/nhanvienchinhthuc");
var DanToc = require("../model/QuanLyNhanSu/dantoc");
const user = require('../model/QuanLyNhanSu/user');



/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//>> GET LIST EMPLOYEE
router.get('/api/danhsachnhanvien', function (req, res, next) {
  NhanVien.find()
    .populate('iddantoc') // multiple path names in one requires mongoose >= 3.6
    .exec(function (err, data) {
      if (data.length == 0) {
        res.status(404);
        res.json({
          status: 404,
          message: 'Không có nhân viên nào để hiển thị'
        });
        return;
      } else {
        res.json({
          status: 200,
          message: 'Successful',
          data: data
        });
      }
    });

});

//>> USER LOGIN
router.post('/api/login', function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  User.find({ username: username, password: password }, (err, data) => {
    if (!data || data.length == 0) {
      res.status(404);
      res.json({
        status: 404,
        message: 'wrong password or username'
      });
      return;
    }
    res.json({
      status: 200,
      message: 'Correct',
      data: data
    });
  });
});

const validateData = (req) => {
  let listError = [];
  if (req.body.trangthai == "" || !req.body.trangthai) {
    let error = {
      field: "trangthai",
      message: "Trạng thái làm việc không được để trống !"
    };
    listError.push(error);
  }

  if (req.body.tennhanvien == "" || !req.body.tennhanvien) {
    let error = {
      field: "tennhanvien",
      message: "Tên nhân viên không được để trống !"
    };
    listError.push(error);
  }

  if (req.body.gioitinh == "" || !req.body.gioitinh) {
    let error = {
      field: "gioitinh",
      message: "Giới tính không hợp lệ !",
    };
    listError.push(error);
  }

  if (req.body.sdt == "" || !req.body.sdt) {
    let error = {
      field: "sdt",
      message: "Số điện thoại không được để trống !",
    };
    listError.push(error);
  }

  if (req.body.email == "" || !req.body.email) {
    let error = {
      field: "email",
      message: "Email không được để trống !",
    };
    listError.push(error);
  }

  if (req.body.ngaysinh == "" || !req.body.ngaysinh) {
    let error = {
      field: "ngaysinh",
      message: "Bạn vui lòng điền chính xác ngày sinh !",
    };
    listError.push(error);
  }

  if (req.body.quequan == "" || !req.body.quequan) {
    let error = {
      field: "quequan",
      message: "Quê quán không được để trống ",
    };
    listError.push(error);
  }

  if (req.body.iddantoc == "" || !req.body.iddantoc) {
    let error = {
      field: "iddantoc",
      message: "Bạn vui lòng chọn dân tộc !",
    };
    listError.push(error);
  }

  if (listError.length != 0)
    return listError;
  else
    return true;
}


//>> THÊM NHÂN VIÊN
router.post('/api/themnhanvien', function (req, res, next) {
  let dataNVCT = {
    ngaybatdau: Date.now(),
    trangthai: req.body.trangthai
  };

  const nhanvienchinhthuc = new NhanVienChinhThuc(dataNVCT);


  if (validateData(req) != true) {
    const listError = validateData(req);
    res.status(400);
    res.json({
      status: 400,
      message: "Server Error",
      errors: listError
    });
  } else {
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
        if (err) {
          res.json({
            status: 404,
            message: 'Something false'
          });
        } else {
          res.json({
            status: 201,
            message: 'Create successfuly'
          });
        }

        res.end();
      });
    });



  }
});

//>> LẤY THÔNG TIN MỘT NHÂN VIÊN
router.get('/api/suanhanvien/:id', function (req, res, next) {
  let id = req.params.id;
  NhanVien.find({ idnhanvienchinhthuc: id }).populate("idnhanvienchinhthuc").exec((err, data) => {
    if (err || data.length == 0) {
      res.json({
        status: 404,
        message: 'Không tìm thấy nhân viên'
      });
    } else {
      res.json({
        status: 200,
        message: "Successful",
        data: data
      });
    }
  })
});

router.put('/api/suanhanvien/:id', function (req, res, next) {

  const id = req.params.id;

  NhanVien.find({ idnhanvienchinhthuc: id }).populate("idnhanvienchinhthuc").exec((err, data) => {
    if (err || data.length == 0) {
      res.status(404);
      res.json({
        status: 404,
        message: "Không tìm thấy nhân viên",
      });
      return;
    }

    NhanVien.findById(data[0]._id, function (err, dataNhanVien) {
      if (validateData(req) != true) {
        const listError = validateData(req);
        res.status(400);
        res.json({
          status: 400,
          message: "Server Error",
          errors: listError
        });
      } else {
        dataNhanVien.tennhanvien = req.body.tennhanvien;
        dataNhanVien.gioitinh = req.body.gioitinh;
        dataNhanVien.sdt = req.body.sdt;
        dataNhanVien.email = req.body.email;
        dataNhanVien.ngaysinh = req.body.ngaysinh;
        dataNhanVien.quequan = req.body.quequan;
        dataNhanVien.iddantoc = req.body.iddantoc;
        dataNhanVien.idtrinhdo = req.body.idtrinhdo;


        dataNhanVien.save().then(function () {
          NhanVienChinhThuc.findById(data[0].idnhanvienchinhthuc, (err, data2) => {
            data2.trangthai = req.body.trangthai;
            data2.save().then(function () {
              NhanVien.find({ _id: data[0]._id }).populate("idnhanvienchinhthuc").exec((err, data3) => {
                res.json({
                  status: 200,
                  message: "Edit successful",
                  data: data3
                });
                res.end();
              })
            });
          })
        })
          .catch(function (error) {
            res.json({
              status: 404,
              message: 'Vui lòng kiểm tra lại thông tin!'
            });
            res.end();
          });
      }
    })
  });
});

//>> XÓA NHÂN VIÊN
router.delete('/api/xoanhanvien/:id', function (req, res, next) {
  const id = req.params.id;
  NhanVien.find({ idnhanvienchinhthuc: id }).populate("idnhanvienchinhthuc").exec((err, data) => {
    if (err || data.length == 0) {
      res.status(404);
      res.json({
        status: 404,
        message: 'Không tìm thấy nhân viên'
      });
      return;
    } else {
      NhanVienChinhThuc.findByIdAndRemove(id).exec()
        .then(function () {
          NhanVien.findByIdAndRemove(data[0]._id).exec();
          res.json({
            status: 200,
            message: 'Delete successful'
          });
          res.end();
        });
    }
  });
});

module.exports = router;
