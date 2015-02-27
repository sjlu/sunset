var models = require('../../models');
var async = require('async');

module.exports.getUser = function(req, res, next) {

  // first see
  if (req.session.uid) {
    models.User.find(req.session.uid, function(err, user) {
      if (err) return next(err);
      req.user = user;
      next();
    });
  } else if (req.headers['authentication-token'] || req.body.access_token || req.query.access_token) {
    var accessToken;
    if (req.headers['authentication-token']) {
      accessToken = req.headers['authentication-token'];
    } else if (req.body.access_token) {
      accessToken = req.body.access_token;
    } else if (req.query.access_token) {
      accessToken = req.query.access_token;
    }

    async.waterfall([
      function(cb) {
        models.Token.find({
          where: {
            token: accessToken
          }
        }, cb);
      },
      function(token, cb) {
        if (!token) {
          return cb(new Error());
        }

        models.User.find(token.user_id, cb);
      },
      function(user, cb) {
        if (!user) {
          return cb(new Error());
        }

        req.user = user;
        cb();
      }
    ], function(err) {
      if (err) return res.send(401);
      next()
    });
  } else {
    next();
  }

}

module.exports.requiresUser = function(req, res, next) {

  if (!req.user) return res.send(401);
  next();

}

module.exports.redirectToLogin = function(req, res, next) {

  if (!req.user) return res.redirect('/login?next=' + encodeURIComponent(req.url));
  next();

}

module.exports.redirectToClientIfLoggedIn = function(req, res, next) {

  if (req.user) return res.redirect('/client');
  next();

}

module.exports.requiresAdmin = function(req, res, next) {
  if (!req.user) return res.send(401);
  if (!req.user.is_admin) return res.send(403);

  next();
}

