var Sequelize = require('sequelize');
var config = require('../config');

var opts = {};
if (config.ENV === 'production') {
  opts.logging = false;
}

module.exports = new Sequelize(config.MYSQL_URL, opts);