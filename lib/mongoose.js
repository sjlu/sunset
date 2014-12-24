var mongoose = require('mongoose');
var config = require('./config');

// connect
var connect = function() {
  mongoose.connect(config.MONGO_URL, {
    server: {
      socketOptions: {
        keepAlive: 1
      }
    }
  });
};
connect();

// catch all errs
mongoose.connection.on('error', function(err) {
  console.log(err);
});

// reconnect if disconnected
mongoose.connection.on('disconnected', function() {
  connect();
});

module.exports = mongoose;