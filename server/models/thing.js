'use strict';

var mongoose = require('mongoose');

var thingSchema = mongoose.Schema({
  name: String,
  description: String
});

module.exports = mongoose.model('thing', thingSchema);