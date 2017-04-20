var express = require('express');
var router = express.Router();
var Toufang = require('../controller/model/toufang');

router.get('/home', function(req, res) {
    var count = 5;//一页显示的内容个数
    var page = req.query.p * 1 || 0;//后边传来的当前页,query传来的数据是字符串,不要忘了转换成number
    console.log(page);
    var index = page * count;//一页开始的下标
    Toufang.find({})
        .exec(function(err, toufangs) {
            if(err) {
                console.log(err);
            }
            var _toufangs = toufangs.slice(index, index + count);
            var totalPage = Math.ceil(toufangs.length / count);
            console.log(_toufangs);
            res.render('homePage', {
                small: '查看列表',
                toufangs: _toufangs,
                currentPage: page + 1,
                totalPage: totalPage
            });

        });

});

module.exports = router;