'use strict';

var chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require("sinon-chai");

chai.should();
chai.use(sinonChai);

describe('The measurement routes', function () {
  var measurementRoutes,
    routeSpy = {
      get: sinon.spy(),
    },
    app = {
      route: sinon.stub().withArgs('/api/measurements').returns(routeSpy)
    },
    controller = {
      measurements: function() {}
    };

  before(function (done) {
    var config = require('../../server/config/config.js')['test'];

    measurementRoutes = require('../../server/measurement/measurementRoutes.js');

    done();
  });

  it('maps GET "/api/measurements" to measurementController.measurements', function (done) {
    measurementRoutes(app, controller);

    app.route.should.have.been.calledWith('/api/measurements');
    routeSpy.get.should.have.been.calledWith(controller.measurements);

    done();
  });
});