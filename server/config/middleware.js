'use strict';

var favicon = require('static-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  root = require('path').join(__dirname, '../..');

module.exports = function (app, express) {

  app.use(favicon());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(cookieParser());
  app.use(express.static(root + '/app'));
  app.use(express.static(root + '/public'));

};