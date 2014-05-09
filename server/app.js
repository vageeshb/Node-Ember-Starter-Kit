#!/usr/bin/env node
'use strict';

// Loading Dependencies
var express = require('express');
var app = express();
var routes = require('./routes');
var middleware = require('./config/middleware.js');
var mongoose = require('mongoose');
var db = require('./config/db');

app.set('port', process.env.PORT || 3000);

// CONFIG
// Middleware
middleware(app, express);
// Database
mongoose.connect(db.url, function (err) {
  if (err) throw err;
  console.log('Connected to database!');
});

if (process.env.ENV_VARIABLE === undefined) { process.env.ENV_VARIABLE = 'development'; }

// Dummy data
if (process.env.ENV_VARIABLE === 'development') {
  var dummyData = require('./config/dummydata.js');
  dummyData.Things();
}
// ROUTES
routes(app);

// LAUNCHING SERVER
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
