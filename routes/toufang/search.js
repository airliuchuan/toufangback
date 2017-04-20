var express = require('express');
var router = express.Router();
var Toufang = require('../../controller/model/toufang')
router.get('/search', function(req, res) {
    var page = req.query.p * 1 || 0;
    var q = req.query.q;
    var count = 5;
    var index = count * page;

    var reg  = new RegExp('.*' + q + '.*', 'i');
    Toufang.find({title: reg})
        .exec(function(err, toufangs) {//这个movies是个数组
            if(err) {
                console.log(err);
            }

            var _toufangs = toufangs.slice(index, index + count);

            res.render('result', {
                small: '查询结果列表页',
                currentPage: (page + 1),//当前页面
                q: q,
                totalPage: Math.ceil(toufangs.length / count),//总共页数(Math.ceil()是向上取整的方法)
                toufangs: _toufangs
            })
        })
});

module.exports = router;