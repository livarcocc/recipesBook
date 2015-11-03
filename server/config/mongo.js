var mongoose = require('mongoose'),
    accountModelSetup = require('../account/account.js'),
    measurementModelSetup = require('../measurement/measurement.js'),
    measurementSeed = require('../measurement/measurementSeed.js');

module.exports = function (config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'mongo connection error.'));

  db.once('open', function callback() {
    console.log('mongo db connection open');
  });

  accountModelSetup();
  measurementModelSetup();

  var Measurement = mongoose.model('Measurement');
  measurementSeed.seed(Measurement, function(){});
};