var _ = require('lodash');
var dotenv = require('dotenv');

// load dotenv config vars if available
dotenv.load();

var config = {
  ENV: 'development',
  SESSION_SECRET: 'AnFDTkRHyDrd87ZKmXfwgZHj',
  MONGO_URL: 'mongodb://localhost/rgb',
  REDIS_URL: 'redis://localhost:6379'
};
config = _.defaults(process.env, config);

// tell express what environment we're in
process.env.NODE_ENV = config.ENV;

module.exports = config;