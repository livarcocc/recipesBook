'use strict';

var chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require("sinon-chai");

chai.should();
chai.use(sinonChai);

var accountRoutes = require('../../server/account/accountRoutes.js');

describe('The Account routes', function () {
  it('maps "/auth/signin" to accountController.signin', function (done) {
    var routeSpy = {
      post: sinon.spy()
      },
      app = {
        route: sinon.stub().withArgs('/auth/signin').returns(routeSpy)
      },
      controller = {
        signin: function() {}
      };

    accountRoutes(app, controller);

    app.route.should.have.been.calledWith('/auth/signin');
    routeSpy.post.should.have.been.calledWith(controller.signin);

    done();
  });
});