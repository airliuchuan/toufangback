var userRequire = require('./user/userReqire');

module.exports = function(app) {
	//登录页面
	app.use('/', require('./sign.js'));
	//主页
	app.use('/', require('./home.js'));
	//REST接口
	app.use('/api', require('./api/wechat'));
	//投放信息录入路由接口
    app.use('/admin', userRequire.signinRequired, require('./toufang/index.js'));
    //用户登录注册路由接口
    app.use('/user', require('./user/index.js'));
    //分类路由接口
    app.use('/category', userRequire.signinRequired, require('./category/index.js'));
    //循环微信号
    app.use('/wxcode', require('./wxcode/index.js'));
};