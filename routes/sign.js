var express = require('express');
var router = express.Router();
var Toufang = require('../controller/model/toufang');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.user) {
      res.redirect('/home');
  }else {
      res.render('signin');
  }

});

module.exports = router;
