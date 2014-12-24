var Qued = require('qued');
var URI = require('URIjs');
var config = require('./config');

if (config.REDIS_URL) {
  var redisParts = URI(config.REDIS_URL);
  var hostname = redisParts.hostname();
  var port = redisParts.port();
  var password = redisParts.password();
}

var qued = new Qued({
  REDIS_HOSTNAME: hostname,
  REDIS_PORT: port,
  TIMEOUT: 60000, // 1 minute
  REDIS_PASSWORD: password
});

module.exports = qued;