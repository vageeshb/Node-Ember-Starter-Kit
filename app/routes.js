'use strict';
// Ember Routes scripts go here
App.Thing = Em.Object.extend();

App.Thing.reopenClass({
  all: function () {
    var things = [];
    $.getJSON('/api/all').then(function (response) {
      response.data.forEach( function (item) {
        var model = App.Thing.create(item); 
        things.addObject(model);
      });
    });
    return things;
  },
});

App.ThingsRoute = Em.Route.extend({
  model: function() {
    return App.Thing.all();
  },
});
