'use strict';

var chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require("sinon-chai");

chai.should();
chai.use(sinonChai);

var userRoutes;

var auth = require('../../server/config/auth');

describe('The user routes', function () {
  before(function (done) {
    var config = require('../../server/config/config.js')['test'];

    userRoutes = require('../../server/account/userRoutes.js');

    done();
  });

  it('maps "/api/users" to userController.users', function (done) {
    var routeSpy = {
        get: sinon.spy()
      },
      app = {
        route: sinon.stub().withArgs('/api/users').returns(routeSpy)
      },
      controller = {
        users: function() {}
      };

    var requiresRoleFunction = function () {};
    auth.requiresRole = sinon.stub();
    auth.requiresRole.withArgs('admin').returns(requiresRoleFunction);

    userRoutes(app, controller);

    app.route.should.have.been.calledWith('/api/users');
    routeSpy.get.should.have.been.calledWith(requiresRoleFunction, controller.users);

    done();
  });
});