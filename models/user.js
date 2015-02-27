var sequelize = require('../lib/sequelize');
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

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
}, {
  instanceMethods: {
    validatePassword: function(password, cb) {
      bcrypt.compare(password, this.password, function(err, match) {
        if (err) return cb(err);
        cb(null, match);
      });
    }
  }
});

var hashPassword = function(instance, opts, done) {
  if (!instance.changed('password')) return done();
  bcrypt.hash(instance.get('password'), 10, function (err, hash) {
    if (err) return done(err);
    instance.set('password', hash);
    done();
  });
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);

module.exports = User;