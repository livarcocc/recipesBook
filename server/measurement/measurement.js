'use strict';

var mongoose = require('mongoose');

module.exports = function () {
  var measurementType = 'imperial metric'.split(' ');

  var measurementSchema = mongoose.Schema({
    name: {
      type: String,
      trim: true
    },
    type: {
      type: String,
      enum: measurementType
    }
  });

  mongoose.model('Measurement', measurementSchema);
};