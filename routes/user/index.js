var express = require('express');
var router = express.Router();
var User = require('../../controller/model/user');

//post 注册模块
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

//post 登录模块
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

//get 登出模块
router.get('/logout', function(req, res) {
    delete req.session.user;
    res.redirect('/')

});

module.exports = router;