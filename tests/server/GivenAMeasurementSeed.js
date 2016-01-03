describe('The measurement seed', function () {
  it('has 15 different measurements', function (done) {
    var measurementSeed = require('../../server/measurement/measurementSeed.js'),
      Measurement = require('mongoose').model('Measurement');

    Measurement.find({}).remove(function () {
      measurementSeed.seed(Measurement, function () {
        Measurement.find({}).exec(function (err, collection) {
          collection.length.should.equal(15);
        });

        done();
      });
    });
  });

  after(function (done) {
    var Measurement = require('mongoose').model('Measurement');

    Measurement.remove({}, function (err){
      done();
    });
  });
});