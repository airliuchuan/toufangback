var express = require('express');
var router = express.Router();
var User = require('../../controller/model/user');

router.post('/signin', function(req, res) {
    _user = req.body.user;

    User.find({name: _user.name}, function(err, user) {
        if(err) {
            console.log(err);
        }

        if(user.length === 0) {
            return res.redirect('/');
        } else {
            if(user[0].password === _user.password) {
                req.session.user = user;

                return res.redirect('/home');
            }else {
                return res.redirect('/')
            }
        }

    });
});

module.exports = router;