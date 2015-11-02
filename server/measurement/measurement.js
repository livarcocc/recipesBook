'use strict';

var mongoose = require('mongoose');

module.exports = function () {
  var measurementType = 'imperial metric'.split(' ');
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