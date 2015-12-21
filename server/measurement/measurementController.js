'use strict';

module.exports = function (Measurement) {
  return {
    measurements: function (req, res) {
      Measurement.find({}).exec(function (err, collection) {
        res.send(collection);
      });
    },
    measurementsForType: function (req, res) {
      console.log(req);

      Measurement.find({type: req.params.type}).exec(function (err, collection) {
        console.log(collection);

        res.send(collection);
      });
    }
  };
};