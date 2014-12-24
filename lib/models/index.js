var mongoose = require('../mongoose');
var fs = require('fs');

var models = {};

fs.readdirSync(__dirname).forEach(function(file) {
  if (file.indexOf('.js') < 0 || file === "index.js") return;

  var modelName = file.replace('.js', '');
  modelName = modelName.substring(0, 1).toUpperCase() + modelName.substring(1);

  models[modelName] = require(__dirname + "/" + file);
});

module.exports = models;