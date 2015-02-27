var sequelize = require('../lib/sequelize');
var Sequelize = require('sequelize');

var Token = sequelize.define('token', {
  user_id: {
    type: Sequelize.INTEGER
  }
  value: {
    type: Sequelize.UUIDV4
  }
});

module.exports = User;