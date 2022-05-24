var express = require('express');
const res = require('express/lib/response');
const async = require('hbs/lib/async');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user/manual')
})

module.exports = router;
