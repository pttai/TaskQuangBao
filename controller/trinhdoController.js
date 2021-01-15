const mongoose = require('mongoose');
const TrinhDo = require('../model/QuanLyNhanSu/trinhdo');
const asyncMiddleware = require('../middlewares/asyncMiddleware');
const SuccessResponse = require('../model/response/success');
const ErrorResponse = require('../model/response/error');
const ObjectId = mongoose.Types.ObjectId;

//>> Lấy danh sách trình độ
exports.LayDanhSachTrinhDo = asyncMiddleware(async(req, res, next) => {
    let danhsachtrinhdo = await TrinhDo.LayDanhSachTrinhDo();
    res.status(200).json(new SuccessResponse(200, danhsachtrinhdo, "Successful"));
});


//>> Thêm trình độ
exports.ThemTrinhDo = asyncMiddleware(async(req, res, next) => {
    let {tentrinhdo, chuyenmon} = req.body;

    let newtrinhdo = new TrinhDo({
        "tentrinhdo": tentrinhdo,
        "chuyenmon": chuyenmon
    });

    let rs = newtrinhdo.save(function(err, data){
        if (err)
            res.status(404).json(new ErrorResponse(404, err));
        else 
            res.status(200).json(new SuccessResponse(200, data, "Thêm thành công"));
    });

});

//>> Sửa trình độ
exports.SuaTrinhDo = asyncMiddleware(async(req, res, next)=> {
    let { id }= req.params;
    let {tentrinhdo, chuyenmon} = req.body;

    if(!ObjectId.isValid(id)){
        res.status(404).json(new ErrorResponse(404, "Không tìm thấy trình độ"));
        res.end();
    } else {
        let trinhdo = await TrinhDo.findByIdAndUpdate(id, {
            "tentrinhdo": tentrinhdo,
            "chuyenmon": chuyenmon       
        }, function(err){
            if(err){
                res.status(404).json(new ErrorResponse(404, err));
                res.end();
            } 
        });
    
        res.status(200).json(new SuccessResponse(200, trinhdo, "Cập nhật thành công"));
    }
});

//>> Xóa trình độ
exports.XoaTrinhDo = asyncMiddleware(async(req, res, next) => {
    let {id} = req.params;

    if(!ObjectId.isValid(id))
        res.status(404).json(new ErrorResponse(404, "Không tìm thấy trình độ để xóa"));
    else {
        let trinhdo = await TrinhDo.findByIdAndDelete(id);
        res.status(200).json(new SuccessResponse(200, trinhdo, "Xóa thành công"));
    }
    
});