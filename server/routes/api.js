'use strict';
var Thing = require('../models/thing.js');

module.exports = {
  // Define your API Route functions here and link them in 'index.js' file
  all: function(req, res) {
    Thing.find({}, function(err, data) {
      if(err) { throw err; }
      res.json({
        url: '/api/all',
        version: '1.0',
        callTime: new Date(),
        data: data
      });
    });
  },

};