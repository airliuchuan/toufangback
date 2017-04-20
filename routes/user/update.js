var express = require('express');
var router = express.Router();
var User = require('../../controller/model/user');

router.get('/update/:id', function(req, res) {

    var id = req.param.id;

    User.find({_id: id}, function(err, user) {

    });

});