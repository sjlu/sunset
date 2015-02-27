var sequelize = require('../lib/sequelize');
var Sequelize = require('sequelize');

var User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING
  }
});

module.exports = User;