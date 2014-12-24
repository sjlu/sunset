var fs = require('fs');

var middlewares = {};

fs.readdirSync(__dirname).forEach(function(file) {
  if (file.indexOf('.js') < 0 || file === "index.js") return;

  var name = file.replace('.js', '');

  middlewares[name] = require(__dirname + "/" + file);
});

module.exports = middlewares;