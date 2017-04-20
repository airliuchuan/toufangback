var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    name: {
            unique: true,
            type: String
    },
    password: String,
    role: {
        type: Number,
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

User.pre('save', function(next) {
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }

    next();//将存储流程进行下去
});

module.exports = User;