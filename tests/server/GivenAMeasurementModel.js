'use strict';

var should = require('chai').should(),
  sinon = require('sinon'),
  mongoose = require('mongoose');

var Measurement, imperialMeasurement, metricMeasurement;

describe('The Measurement model', function () {
  before(function (done) {
    Measurement = mongoose.model('Measurement');

    done();
  });

  it('validates that the type is either imperial or metric', function (done) {
    var measurement = new Measurement({name: 'pounds', type: 'not imperial'});

    measurement.save(function (err) {
      err.should.exist;
      done();
    });
  });

  it('can create a measurement with imperial category', function (done) {
    imperialMeasurement = new Measurement({name: 'pounds', type: 'imperial'});

    imperialMeasurement.save(function (err) {
      should.not.exist(err);
      done();
    });
  });

  it('can create a measurement with imperial category', function (done) {
    metricMeasurement = new Measurement({name: 'pounds', type: 'metric'});

    metricMeasurement.save(function (err) {
      should.not.exist(err);
      done();
    });
  });

  after(function (done) {
    if(imperialMeasurement !== null)
    {
      imperialMeasurement.remove();
    }

    if(metricMeasurement !== null) {
      metricMeasurement.remove();
    }

    done();
  });
});