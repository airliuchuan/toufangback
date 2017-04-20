var toufang = require('../schemas/toufang');
var mongoose = require('mongoose');

var Toufang = mongoose.model('Toufang', toufang);

module.exports = Toufang;