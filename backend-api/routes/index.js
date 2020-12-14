var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/api/helloworld', function(req, res, next) {
  res.json({sayHi: 'hello from server'});
});

module.exports = router;
