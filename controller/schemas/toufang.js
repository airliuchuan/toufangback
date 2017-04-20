var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Toufang = new Schema({
    title: String,
    url: String,
    wechat: String,
    title1: String,
    title2: String,
    title3: String,
    meta: {//更新数据的时间记录
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

Toufang.pre('save', function(next) {
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }

    next();//将存储流程进行下去
});

module.exports = Toufang;