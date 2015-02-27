var assert = require('assert');
var server = require('../web');
var supertest = require('supertest');
var expect = require('chai').expect;

describe(__filename, function() {
  var request = supertest.agent(server);

  it('should load the index page', function(done) {
    request.get('/').send().end(done)
  });
});