var express = require('express');
var router = express.Router();
var Toufang = require('../../controller/model/toufang');

router.get('/update/:id', function(req, res) {
    var id = req.params.id;

    if (id) {
        Toufang.find({_id: id}, function (err, toufang) {
            console.log(toufang);
            res.render('admin', {
                toufang: toufang[0],
            })

        })
    }
});

module.exports = router;