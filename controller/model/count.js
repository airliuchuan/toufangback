var mongoose = require('mongoose');
var count = require('../schemas/user');

var Count = mongoose.model('Count', count);

module.exports = Count;