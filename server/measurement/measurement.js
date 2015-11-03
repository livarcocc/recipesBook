'use strict';

var mongoose = require('mongoose');

module.exports = function () {
  var measurementType = 'Imperial Metric'.split(' ');
  var categoryType = 'Length Volume Weight'.split(' ');

  var measurementSchema = mongoose.Schema({
    name: {
      type: String,
      trim: true
    },
    type: {
      type: String,
      enum: measurementType
    },
    category: {
      type: String,
      enum: categoryType
    }
  });

  mongoose.model('Measurement', measurementSchema);
};