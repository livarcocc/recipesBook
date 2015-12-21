'use strict';

var Measurement = require('mongoose').model('Measurement');
var measurementController = require('./measurementController.js')(Measurement);

module.exports = function(app, controller) {

  if(controller === undefined)
  {
    controller = measurementController;
  }

  app.route('/api/measurements').get(controller.measurements);
  app.route('/api/measurements/:type').get(controller.measurementsForType);
};

