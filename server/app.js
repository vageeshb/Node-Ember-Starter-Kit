#!/usr/bin/env node
'use strict';

// Loading Dependencies
var express = require('express');
var app = express();
var routes = require('./routes');
var middleware = require('./config/middleware.js');

// CONFIG
// Middleware
middleware(app, express);

// ROUTES
routes(app);

// LAUNCHING SERVER
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
