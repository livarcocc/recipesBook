var _und = require('underscore');

exports.seed = function (Measurement, next) {
  var measurements = [
    {
      name: 'inch (in)',
      type: 'Imperial',
      category: 'Length'
    },
    {
      name: 'foot (ft)',
      type: 'Imperial',
      category: 'Length'
    },
    {
      name: 'fluid ounce (fl oz)',
      type: 'Imperial',
      category: 'Volume'
    },
    {
      name: 'pint (pt)',
      type: 'Imperial',
      category: 'Volume'
    },
    {
      name: 'quart (qt)',
      type: 'Imperial',
      category: 'Volume'
    },
    {
      name: 'gallon (gal)',
      type: 'Imperial',
      category: 'Volume'
    },
    {
      name: 'ounce (oz)',
      type: 'Imperial',
      category: 'Weight'
    },
    {
      name: 'pound (lb)',
      type: 'Imperial',
      category: 'Weight'
    },
    {
      name: 'centimetre (cm)',
      type: 'Metric',
      category: 'Length'
    },
    {
      name: 'metre (m)',
      type: 'Metric',
      category: 'Length'
    },
    {
      name: 'millilitre (ml)',
      type: 'Metric',
      category: 'Volume'
    },
    {
      name: 'litre (l)',
      type: 'Metric',
      category: 'Volume'
    },
    {
      name: 'gram (g)',
      type: 'Metric',
      category: 'Weight'
    },
    {
      name: 'kilogram (kg)',
      type: 'Metric',
      category: 'Weight'
    }
  ];

  Measurement.find({}).exec(function (err, collection) {

    if(collection.length > 0)
    {
      next();
    }
    else {
      var count = measurements.length;
      _und.each(measurements, function (newMeasurement) {
        Measurement.create(newMeasurement, function (err) {
          if (err) {
            console.log(err);
          }

          if (--count === 0) {
            next();
          }
        });
      });
    }
  });
};