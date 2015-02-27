var models = require('../models');
var expect = require('chai').expect;

describe(__filename, function() {

  var user;

  it('should properly create a user', function(done) {
    models.User.create({
      email: 'test@test.com',
      password: 'testing1'
    }).done(function(err, model) {
      expect(err).to.be.null;
      user = model;
      done();
    });
  });

  it ('should never reveal the password', function(done) {
    models.User.find(user.id).done(function(err, user) {
      expect(err).to.be.null;
      expect(user.password).to.not.equal('testing1');
      done();
    });
  });

  it ('should validate the password', function(done) {
    models.User.find(user.id).done(function(err, user) {
      expect(err).to.be.null;
      user.validatePassword('testing1', function(err, match) {
        expect(err).to.be.null;
        expect(match).to.be.true;
        done();
      });
    });
  });

  it ('should decline the password', function(done) {
    models.User.find(user.id).done(function(err, user) {
      expect(err).to.be.null;
      user.validatePassword('testing2', function(err, match) {
        expect(err).to.be.null;
        expect(match).to.be.false;
        done();
      });
    });
  });

});