var express = require('express');
var router = express.Router();

router.post('/change', function(req,res) {
	res.header("Access-Control-Allow-Origin", "*");//第二个参数为要请求跨域的的域名,此域名不可以带端口号,或二级域名, '*'为允许所有人访问
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");

	var arrLen = req.body.arrlen;
	console.log(arrLen);

	var index;
	console.log(index)
	if(index) {
		index++;
		if(index >= arrLen) {
			index = 0
		}
	}else {
		index = 0;
	}
	
	console.log(index,'index')
	res.send({index: index});

});

// router.get('/getchan', function(req, res) {
// 	var index = 0;
// 	index ++;
// 	res.send({index: index});
// })

module.exports = router;