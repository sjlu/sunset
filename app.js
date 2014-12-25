var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('./lib/mongoose');
var app = express();
var config = require('./lib/config');
var redis = require('./lib/redis');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var flash = require('express-flash');
var middlewares = require('./lib/middlewares');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
  secret: config.SESSION_SECRET,
  store: new RedisStore({
    client: redis
  }),
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// middlewares

// routes
app.use('/', require('./routes/index'));
app.use('/client', require('./routes/client'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
    console.error(err);
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.error(err);
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
