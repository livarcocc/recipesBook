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

  it('validates the type', function (done) {
    var measurement = new Measurement({name: 'pounds', type: 'not imperial', category: 'Weight'});

    measurement.save(function (err) {
      err.should.exist;
      done();
    });
  });

  it('validates the category', function (done) {
    var measurement = new Measurement({name: 'pounds', type: 'imperial', category: 'not Weight'});

    measurement.save(function (err) {
      err.should.exist;
      done();
    });
  });

  it('can create a measurement with imperial category', function (done) {
    imperialMeasurement = new Measurement({name: 'pounds', type: 'imperial', category: 'Weight'});

    imperialMeasurement.save(function (err) {
      should.not.exist(err);
      done();
    });
  });

  it('can create a measurement with imperial category', function (done) {
    metricMeasurement = new Measurement({name: 'pounds', type: 'metric', category: 'Weight'});

    metricMeasurement.save(function (err) {
      should.not.exist(err);
      done();
    });
  });

  it('can create a measurement with length category', function (done) {
    imperialMeasurement = new Measurement({name: 'pounds', type: 'imperial', category: 'Length'});

    imperialMeasurement.save(function (err) {
      should.not.exist(err);
      done();
    });
  });

  it('can create a measurement with weight category', function (done) {
    metricMeasurement = new Measurement({name: 'pounds', type: 'metric', category: 'Weight'});

    metricMeasurement.save(function (err) {
      should.not.exist(err);
      done();
    });
  });

  it('can create a measurement with volume category', function (done) {
    metricMeasurement = new Measurement({name: 'pounds', type: 'metric', category: 'Volume'});

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