var express = require('express');
var router = express.Router();
var Toufang = require('../../controller/model/toufang');

router.post('/new',function(req, res) {
    console.log(req.body.toufang);
    var id = req.body.toufang._id;
    var postData = req.body.toufang;
    var _toufang;

    if(id) {
        Toufang.update({_id: id},{$set: {title: postData.title, url: postData.url, wechat: postData.wechat, title1: postData.title1, title2: postData.title2, title3: postData.title3}}, function(err, toufang) {
            if(err) {
                console.log(err);
            }

            res.redirect('/admin/list');
        });
    }else {
        _toufang = new Toufang(postData);
        _toufang.save(function(err){
            if(err) {
                console.log(err);
            }
            res.redirect('/admin/list');
        })
    }



});

module.exports = router;