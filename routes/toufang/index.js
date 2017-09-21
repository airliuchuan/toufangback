var express = require('express');
var router = express.Router();
var Toufang = require('../../controller/model/toufang');
var Category = require('../../controller/model/category');

//get 录入页面
router.get('/input', function(req, res) {
    Category.find({}, function(err, categories) {
        // console.log(categories[1]._id, 'toufang>admin.js');
        res.render('admin',{
            small: '投放后台',
            toufang: {},
            categories: categories
        })
    });
});

//post 录入投放信息
router.post('/new',function(req, res) {
    // console.log(req.body.toufang);

    var id = req.body.toufang._id;
    var postData = req.body.toufang;
    console.log(postData, 'postData');
    var _toufang;
    var categoryId = postData.category;

    if(id) {
        Toufang.update({_id: id},{$set: {title: postData.title, url: postData.url, wechat: postData.wechat, title1: postData.title1, title2: postData.title2, title3: postData.title3,auditUrl: postData.auditUrl, category: postData.category}}, function(err, toufang) {
            if(err) {
                console.log(err);
            }

            res.redirect('/admin/list');
        });
    }else {

        _toufang = new Toufang(postData);

        var categoryId = postData.category;
        var categoryName = postData.categoryName;


        _toufang.save(function(err, toufang){
            if(err) {
                console.log(err);
            }
            res.redirect('/admin/list');
        })
    }
});

//get 投放信息列表页
router.get('/list', function(req, res) {
    var count = 5;
    var page = req.query.p * 1 || 0;
    var index = page * count;

    var query = {

    };

    Toufang.find({})
        .exec(function(err, toufangs){
            if(err) {
                console.log(err);
            }

            var totalPage = Math.ceil(toufangs.length / count);
            var _toufangs = toufangs.slice(index, index + count);

            Category.find({}, function(err, categories) {
                res.render('list', {
                    small: '投放列表',
                    toufangs: _toufangs,
                    currentPage: page + 1,
                    totalPage: totalPage,
                    categories: categories

                });

            });

        });
});

//get 搜索功能,搜索结果页
router.get('/search', function(req, res) {
    var page = req.query.p * 1 || 0;
    var q = req.query.q;
    var count = 5;
    var index = count * page;

    var reg  = new RegExp('.*' + q + '.*', 'i');
    Toufang.find({title: reg})//分页的时候用find命名查找小分类内容返回数组
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

//get 更新页面
router.get('/update/:id', function(req, res) {
    var id = req.params.id;
    console.log(id, 'req.parsms.id');
    if (id) {
        Toufang.findOne({_id: id}, function (err, toufang) {
            console.log(toufang);
            Category.find({}, function(err, categories) {
                console.log(toufang,'toufang');
                res.render('admin', {
                    toufang: toufang,
                    categories: categories
                })
            });
        })


    }
});

//delete 删除投放信息
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

//post 判断是否注册的状态
router.post('/audit', function(req, res) {
    console.log(req.body.objId);
    var audit = req.body.audit;
    var id = req.body.objId;
    Toufang.update({_id: id}, {$set: {isAudit: audit}}, function(err, toufang) {
        if(err) {
            console.log(err);
        }
        console.log(toufang);
        res.send({
            code: 200
        })
    })
});

module.exports = router;