var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Hello i am working');
})

module.exports = router;
