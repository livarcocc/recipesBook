'use strict';

var chai = require('chai'),
  should = require('chai').should(),
  sinon = require('sinon'),
  sinonChai = require("sinon-chai"),
  _und = require('underscore');

chai.should();
chai.use(sinonChai);

describe('The Measurement controller', function () {
  var measurementCollection = [{name: 'measurement1', type: 'metric '}, {name: 'measurement2', type: 'imperial'}];
  var measurementsController,
    request,
    response,
    measurementSpy = {
      find: function(condition) {
        return {
          exec: function (callback) {
            var measurements = measurementCollection;

            if(condition !== undefined)
            {
              if(condition.type !== undefined)
              {
                measurements = _und.filter(measurements, function (measurement) {
                  return measurement.type === condition.type;
                });
              }
            }

            callback(undefined, measurements);
          }
        }
      }
    };

  before(function (done) {
    request = {
    };

    response = {
      status: sinon.spy(),
      send: sinon.stub()
    };

    measurementsController = require('../../server/measurement/measurementController.js')(measurementSpy);

    done();
  });

  describe('GET measurements', function() {
    it('returns a collection of measurements', function (done) {
      measurementsController.measurements(request, response);

      response.send.should.have.been.calledWith(measurementCollection);

      done();
    });
  });

  describe('GET measurements for type', function () {
    it('returns a collection of measurements scoped to type', function (done) {
      request.type = 'metric';

      measurementsController.measurementsForType(request, response);

      response.send.should.have.been.calledWith(_und.filter(measurementCollection, function (measurement) {
        return measurement.type === 'metric';
      })) ;

      done();
    });
  });
});