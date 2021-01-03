var express = require('express');
var router = express.Router();
var Ca = require('../model/QuanLyNhanSu/ca');
var moment = require('moment');


router.get('/chamcong/laydanhsachca', function (req, res, next) {
  Ca.find({},(function(err, data){
    console.log(moment(data[0].giobatdau, "HH:mm:ss"));
    res.json(data);
  }));
});

router.post('/chamcong/themmotca', function (req, res, next) {
  let data = {
    "tenca": req.body.tenca,
    "giobatdau": req.body.giobatdau,
    "gioketthuc": req.body.gioketthuc,
    "batdaunghigiuaca": req.body.batdaunghigiuaca,
    "ketthucnghigiuaca": req.body.ketthucnghigiuaca
  }

  let newCa = new Ca(data);
  newCa.save().then(function(err){
    if(err)
      res.status(404);
    res.status(201);
    res.send("Create successful");
    res.end();
  });
});

router.get('/chamcong/laymotca/:id', function (req, res, next) {
  let id = req.params.id;
  Ca.findById(id, function(err, data){
    if(err){
      res.status(404);
      res.send("Not found");
    }
    res.json(data);
    res.end();
  });
});


router.put('/chamcong/suamotca/:id', function (req, res, next) {
  let id = req.params.id;
  
  Ca.findById(id, function(err, data){
    if(!data){
      res.status(404);
      res.send("Something false ");
    }
    data.tenca = req.body.tenca;
    data.giobatdau = req.body.giobatdau;
    data.gioketthuc = req.body.gioketthuc;
    data.batdaunghigiuaca = req.body.batdaunghigiuaca;
    data.ketthucnghigiuaca = req.body.batdaunghigiuaca;
    
    data.save();
    res.send("Edit successful");
    res.end();
  });
});

router.delete('/chamcong/xoamotca/:id', function (req, res, next) {
  let id = req.params.id;
  
  Ca.findById(id, function(err, data){
    if(!data || data.length == 0){
      res.status(404);
      res.send("Something false");
      res.end();
    }
      
    
    Ca.findByIdAndRemove(id).exec();
    res.send("Delete Successful");
    res.end();
  });
});
module.exports = router;