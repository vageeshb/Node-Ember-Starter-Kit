'use strict';

var App = Ember.Application.create({
  VERSION: '0.0.1',

  LOG_TRANSITIONS: true,
    
});

App.Router.map(function() {
  this.resource('things', {path: '/'});
});