var express = require('express');
var router = express.Router();
var Category = require('../../controller/model/category');
var Toufang = require('../../controller/model/toufang');

//get 渠道分类输入页面
router.get('/create', function(req, res) {
    res.render('admin_category', {
        small: '渠道分类',
        category: {}
    });
});

//post 渠道分类输入逻辑
router.post('/create', function(req, res) {
    var id = req.body.category._id;
    var name = req.body.name;
    var categoryObj = req.body.category;
    console.log(categoryObj, 'obj');

    if(!id) {

        var category = new Category(categoryObj);
        category.save(function(err) {
            if(err) {
                console.log(err);
            }

            return res.redirect('/category/catlist');
        });
    } else {
        Category.update({_id: id}, {$set: {name: req.body.category.name}}, function(err, result) {
            if(err) {
                console.log(err);
            }
            Category.findOne({_id: id}, function(err, category) {

                console.log(category, 'findeOne', name);
                Toufang.update({category: name},{$set: {category: category.name}}, function(err, result) {
                    res.redirect('/category/catlist')
                });
            });
        });
    }

});

//渠道分类列表页面
router.get('/catlist', function(req, res) {

    Category.find({}, function(err, categories) {
        if(err) {
            console.log(err);
        }

        res.render('cat_list', {
            small: '渠道分类列表',
            categories: categories
        });
    });

});

//get 某一分类下的所有投放信息
router.get('/list', function(req, res) {
    var id = req.query.id;

    console.log(id, 'category>list1');
    if(id) {
        Toufang.find({category: id})
            .exec(function(err, categories) {
                console.log(categories, 'category>list1>find');
                res.render('category_list', {
                    small: id + '列表',
                    categories: categories
                })
            })
    } else {
        console.log('category>list>miss id')
    }
});

//get 更新分类名称
router.get('/update/:id', function(req, res) {
    var id = req.params.id;

    Category.findOne({_id: id}, function(err, category) {
        if(err) {
            console.log(err);
        }
        console.log(category);
        res.render('admin_category', {
            small: '分类更新',
            category: category
        });
    });
});

//get 删除分类名 并重新渲染
router.get('/del', function(req, res) {
    var name = req.query.name;

    console.log(name);

    Category.remove({name: name}, function(err, result) {
        if(err) {
            console.log(err);
        }

        console.log(result.result.ok, 'ok');

        if(result.result.ok === 1) {
            console.log(1)
            Category.find({}, function(err, categories) {

                if(err) {
                    console.log(err);
                }

                console.log(categories, 'cat');

                Toufang.update({category: name}, {$set: {category: ''}}, function(err, result) {
                    if(err) {
                        console.log(err);
                    }

                    console.log(result, '更新结果');

                });

                res.render('cat_list', {
                    small: '分类列表',
                    categories: categories
                })
            });
        }
    });
});

module.exports = router;