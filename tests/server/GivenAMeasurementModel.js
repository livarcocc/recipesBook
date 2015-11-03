'use strict';

var should = require('chai').should(),
  sinon = require('sinon'),
  mongoose = require('mongoose');

var Measurement, measurement;

describe('The Measurement model', function () {
  before(function (done) {
    Measurement = mongoose.model('Measurement');

    done();
  });

  it('validates the type', function (done) {
    measurement = new Measurement({name: 'pounds', type: 'not imperial', category: 'Weight'});

    measurement.save(function (err) {
      err.should.exist;
      done();
    });
  });

  it('validates the category', function (done) {
    measurement = new Measurement({name: 'pounds', type: 'Imperial', category: 'not Weight'});

    measurement.save(function (err) {
      err.should.exist;
      done();
    });
  });

  it('can create a measurement with imperial category', function (done) {
    measurement = new Measurement({name: 'pounds', type: 'Imperial', category: 'Weight'});

    measurement.save(function (err) {
      should.not.exist(err);
      done();
    });
  });

  it('can create a measurement with metric category', function (done) {
    measurement = new Measurement({name: 'pounds', type: 'Metric', category: 'Weight'});

    measurement.save(function (err) {
      should.not.exist(err);
      done();
    });
  });

  it('can create a measurement with length category', function (done) {
    measurement = new Measurement({name: 'pounds', type: 'Imperial', category: 'Length'});

    measurement.save(function (err) {
      should.not.exist(err);
      done();
    });
  });

  it('can create a measurement with weight category', function (done) {
    measurement = new Measurement({name: 'pounds', type: 'Metric', category: 'Weight'});

    measurement.save(function (err) {
      should.not.exist(err);
      done();
    });
  });

  it('can create a measurement with volume category', function (done) {
    measurement = new Measurement({name: 'pounds', type: 'Metric', category: 'Volume'});

    measurement.save(function (err) {
      should.not.exist(err);
      done();
    });
  });

  afterEach(function (done) {
    if(measurement !== null)
    {
      measurement.remove();
    }

    done();
  });
});