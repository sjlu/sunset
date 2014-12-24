var qued = require('./lib/qued');
var jobs = require('./jobs');
var _ = require('lodash');

_.each(jobs, function(job, key) {
  qued.addProcess(key, job);
});

var worker = qued.createWorker();

if (process.send) process.send('online');
process.on('message', function(message) {
  if (message === 'shutdown') {
    worker.shutdown(function() {
      process.exit(0);
    });
  };
});