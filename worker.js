var queues = require('./lib/queues');
var jobs = require('./jobs');
var _ = require('lodash');

_.each(queues, function(queue, name) {
  queue.process(jobs[name]);
});

if (process.send) process.send('online');
process.on('message', function(message) {
  process.exit(0);
});
