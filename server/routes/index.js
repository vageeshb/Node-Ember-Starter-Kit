'use strict';

var path = require('path'),
  apiRoutes = require('./api.js');

module.exports = function (app) {
  app.get('/', function(req, res) {
    res.sendfile(path.join(__dirname, '../views/index.html'));
  });

  app.get('/api/all', apiRoutes.all);
};