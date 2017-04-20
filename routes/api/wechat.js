var express = require('express');
var router = express.Router();
var Toufang = require('../../controller/model/toufang');

router.get('/wechat', function(req, res) {

    res.header("Access-Control-Allow-Origin", "*");//第二个参数为要请求跨域的的域名,此域名不可以带端口号,或二级域名, '*'为允许所有人访问
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");

    Toufang.find({})
        .exec(function(err, Toufangs ) {
            res.send({
                code: 200,
                data: Toufangs
            });
        });
});

module.exports = router;