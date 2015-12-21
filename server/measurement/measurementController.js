'use strict';

module.exports = function (Measurement) {
  return {
    measurements: function (req, res) {
      Measurement.find({}).exec(function (err, collection) {
        res.send(collection);
      });
    },
    measurementsWithType: function (req, res) {
    }
  };
};