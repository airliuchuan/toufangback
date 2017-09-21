var mongoose = require('mongoose');
var category = require('../schemas/category');

var Category = mongoose.model('Category', category);

module.exports = Category;