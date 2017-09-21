var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Count = new Schema({
    sessionid: String,
    btn1: {
        type: String,
        default: 0
    },
    btn2: {
        type: String,
        default: 0
    },
    btn3: {
        type: String,
        default: 0
    },
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

Count.pre('save', function(next) {
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }

    next();//将存储流程进行下去
});

module.exports = Count;