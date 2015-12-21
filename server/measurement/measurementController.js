'use strict';

module.exports = function (Measurement) {
  return {
    measurements: function (req, res) {
      Measurement.find({}).exec(function (err, collection) {
        res.send(collection);
      });
    },
    measurementsForType: function (req, res) {
      Measurement.find({type: req.type}).exec(function (err, collection) {
        res.send(collection);
      });
    }
  };
};