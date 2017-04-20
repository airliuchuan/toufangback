var express = require('express');
var router = express.Router();

router.get('/input', function(req, res) {
	res.render('admin',{
		small: '投放后台',
        toufang: {}
	})
});

module.exports = router;