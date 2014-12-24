var express = require('express');
var router = express.Router();
var middlewares = require('../lib/middlewares');
var models = require('../lib/models');
var validator = require('validator');
var _ = require('lodash');

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('index');
});

module.exports = router;