var express = require('express');
var router = express.Router();
var User = require('../../controller/model/user');

router.get('/logout', function(req, res) {
   delete req.session.user;
   res.redirect('/')

});

module.exports = router;