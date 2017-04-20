var express = require('express');
var router = express.Router();
var Toufang = require('../../controller/model/toufang')

router.delete('/list', function(req, res) {
    var id = req.query.id;
    if(id) {
        Toufang.remove({_id: id}, function(err, toufangs) {
            if(err) {
                console.log(err);
            } else {
                console.log('remove success')
            }

        })
    }

});

module.exports = router;