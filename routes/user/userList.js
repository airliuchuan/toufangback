var express = require('express');
var router = express.Router();
var User = require('../../controller/model/user');

router.get('/list', function(req, res) {
    User.find({})
        .exec(function(err, users) {
            if(err) {
                console.log(err);
            }

            res.render('userList',{
                users: users
            })
        });

});

module.exports = router;