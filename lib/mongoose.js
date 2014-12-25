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
var retry = 0;
mongoose.connection.on('disconnected', function() {
  if (retry < 3) {
    connect();
  } else {
    console.error("mongo failed to connect");
  }
});

module.exports = mongoose;
