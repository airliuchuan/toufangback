var express = require('express');
var router = express.Router();
var User = require('../../controller/model/user');

router.post('/signup', function(req, res) {
    console.log(req.body.user);
    _user = req.body.user;

    User.find({name: _user.name}, function(err, user) {
        if(user.length !== 0) {
            return res.redirect('/');
        } else {
            user = new User(_user);
            user.save(function(err) {
                if(err) {
                    console.log(err);
                }
                res.redirect('/admin/list');
            })
        }
    })
});

module.exports = router;