'use strict';

var chai = require('chai'),
  should = require('chai').should(),
  sinon = require('sinon'),
  sinonChai = require("sinon-chai");

chai.should();
chai.use(sinonChai);

describe('The Measurement controller', function () {
  var measurementCollection = ['measurement1', 'measurement2'];
  var measurementsController,
    request,
    response,
    measurementSpy = {
      find: function() {
        return {
          exec: function (callback) {
            callback(undefined, measurementCollection);
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
});