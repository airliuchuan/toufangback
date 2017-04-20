//中间件 登录判断
exports.signinRequired = function (req, res, next) {
    var user = req.session.user;

    if(!user) {
        return res.redirect('/');
    }

    next();
};

//权限管理
exports.adminRequired = function (req, res, next) {
    var user = req.session.user;

    if(user[0].role < 10 ) {
        return res.redirect('/home')
    }

    next();
};