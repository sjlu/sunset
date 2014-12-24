var fs = require('fs');

var jobs = {};

fs.readdirSync(__dirname).forEach(function(file) {
  if (file.indexOf('.js') < 0 || file === "index.js") return;

  var jobName = file.replace('.js', '');

  jobs[jobName] = require(__dirname + "/" + file);
});

module.exports = jobs;