var express = require('express');
var router = express.Router();
var Count = require('../../controller/model/count.js');

router.post('/click', function(res,req) {
    res.header("Access-Control-Allow-Origin", "*");//http://vshow30.net
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Content-Type", "application/json;charset=utf-8");
    data = {
        "sessionid": req.session.id,
        "btn1": req.body.btn1,
        "btn2": req.body.btn2,
        "btn3": req.body.btn3,
    };
    console.log(data)
    var count = new Count(data);

    Count.find({"sessionid":userdata.sessionid}, function(err, docs) {
        console.log("length == > " + docs.length);
        if (err) {
            console.log('err:', err);
            return;
        } else if(docs.length > 0){
            Count.update({"sessionid":userdata.sessionid},{$set: {btn1: data.btn1, btn2: data.btn2, btn3: data.btn3}},function(err){
                console.log('update status:', err ? err : 'success');
                res.send('count');
            });
        } else {
            count.save(function(err) {    // 执行保存，并查看返回情况
                console.log('save status:', err ? err : 'success');
                res.send('count');
            });
        }
    });

})

module.exports = router;