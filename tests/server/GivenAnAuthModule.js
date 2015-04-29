'use strict';

var chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require("sinon-chai");

chai.should();
chai.use(sinonChai);

var auth = require('../../server/config/auth');

describe('The Auth module', function () {
  describe('The requiresApiLogin method', function () {
    it('returns 403 when the user is not authenticated', function () {
      var request = {
        isAuthenticated: function () {
          return false;
        }
      },
      response = {
        status: sinon.spy(),
        end: sinon.spy()
      };

      auth.requiresApiLogin(request, response);

      response.status.should.have.been.calledWith(403);
      response.end.should.have.been.called;
    });

    it('invokes the next middleware when the user is authenticated', function () {
      var request = {
        isAuthenticated: function () {
          return true;
        }
      },
      next = sinon.spy();

      auth.requiresApiLogin(request, undefined, next);

      next.should.have.been.called;
    });
  });

  describe('The requireRole method', function () {
    it('returns 403 when the user does not have the role specified in the method', function () {
      var request = {
          user: {
            roles: ['regular-joe']
          }
        },
        response = {
          status: sinon.spy(),
          end: sinon.spy()
        };

      var requireRole = auth.requiresRole('admin');

      requireRole(request, response);

      response.status.should.have.been.calledWith(403);
      response.end.should.have.been.called;
    });

    it('returns 403 when the user does not have the role specified in the method', function () {
      var request = {
          user: {
            roles: ['regular-joe', 'admin']
          }
        },
        response = {
          status: sinon.spy(),
          end: sinon.spy()
        },
        next = sinon.spy();

      var requireRole = auth.requiresRole('admin');

      requireRole(request, response, next);

      response.status.should.not.have.been.calledWith(403);
      response.end.should.not.have.been.called;

      next.should.have.been.called;
    });
  });
});