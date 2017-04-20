var mongoose = require('mongoose');
var user = require('../schemas/user');

var User = mongoose.model('User', user);

module.exports = User;