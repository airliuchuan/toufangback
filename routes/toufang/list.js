var express = require('express');
var router = express.Router();
var Toufang = require('../../controller/model/toufang');

router.get('/list', function(req, res) {
	var count = 5;
	var page = req.query.p * 1 || 0;
	var index = page * count;

    Toufang.find({})
        .exec(function(err, toufangs){
        	if(err) {
        		console.log(err);
			}

            var totalPage = Math.ceil(toufangs.length / count);
            var _toufangs = toufangs.slice(index, index + count);

            res.render('list', {
                small: '投放列表',
                toufangs: _toufangs,
				currentPage: page + 1,
				totalPage: totalPage
            });
        });
});

module.exports = router;