var Queue = require('bull');
var URI = require('URIjs');
var jobs = require('../jobs');
var config = require('./config');
var _ = require('lodash');
var winston = require('./winston');
var util = require('util');

var redisParts = URI(config.REDIS_URL || 'redis://localhost:6379');
var redisHostname = redisParts.hostname();
var redisPort = redisParts.port();
var redisPassword = redisParts.password();
var redisOpts = {};
if (redisPassword && redisPassword.length) {
  redisOpts.auth_pass = redisPassword;
}

// according to "bull", queues are cheap
// and one should be created for each job.
// we also need the Queue "instance" to
// create jobs with
var createQueue = function(name) {
  var queue = Queue(name, redisPort, redisHostname, redisOpts);
  queue.on('completed', function(job) {
    winston.verbose('job success', {
      name: name,
      data: job.data
    });
  });
  queue.on('failed', function(job, err) {
    winston.error('job failed', {
      name: name,
      data: job.data
    });
    console.trace(err);
  });
  return queue;
}

module.exports = _.chain(jobs).map(function(process, name) {
  return createQueue(name);
}).indexBy("name").value();