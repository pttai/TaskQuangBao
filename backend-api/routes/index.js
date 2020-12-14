var express = require('express');
var router = express.Router();
var User = require("../model/user");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/api/helloworld', function(req, res, next) {
  res.json({sayHi: 'hello from server'});
});

router.get('/api/login', function(req,res,next){
  User.find({}, (err, data) => {
    res.json(data);
  });
});

router.post('/api/login', function(req,res,next){
  let username = req.body.username;
  let password = req.body.password;
  
  User.find({username: username, password: password}, (err, data) => {
    res.json(data);
  });
});

module.exports = router;
