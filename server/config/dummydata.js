'use strict';

var Thing = require('../models/thing');

module.exports = {
  Things: function () {
    Thing.remove(function () {
      Thing.create([{
        name: 'Node.js',
        description: 'Platform to create scalable web and network applications'
      },
      {
        name: 'Ember.js',
        description:'Framework to create ambitious web applications'
      }], function () {
        console.log('Dummy Things created!');
      });
    });
  },
};