var userRequire = require('./user/userReqire');
module.exports = function(app) {
	app.use('/', require('./sign.js'));
	app.use('/', require('./home.js'));
	app.use('/api', require('./api/wechat'));
	app.use('/admin', userRequire.signinRequired, require('./toufang/admin.js'));
	app.use('/admin', userRequire.signinRequired, require('./toufang/list.js'));
	app.use('/admin', userRequire.signinRequired, require('./toufang/new.js'));
	app.use('/admin', userRequire.signinRequired, require('./toufang/del.js'));
	app.use('/admin', userRequire.signinRequired, require('./toufang/update.js'));
	app.use('/admin', userRequire.signinRequired, require('./toufang/search.js'));
	app.use('/user', require('./user/signup.js'));
	app.use('/user', require('./user/signin.js'));
    app.use('/user', require('./user/logout.js'));
    app.use('/user', require('./user/userList.js'));
};