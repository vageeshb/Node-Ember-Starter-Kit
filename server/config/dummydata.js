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
      },
      {
        name: 'MongoDB',
        description: 'Document-oriented NoSQL Database'
      },
      {
        name: 'ExpressJS',
        description: 'Simple and flexible framework for creating web applications using Node.js'
      }], function () {
        console.log('Dummy Things created!');
      });
    });
  },
};