'use strict';

var chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require("sinon-chai");

chai.should();
chai.use(sinonChai);

describe('The User controller', function () {
  var userCollection = ['user1', 'user2'];
  var userController,
    userSpy = {
      find: function() {
        return {
          exec: function (callback) {
            callback(undefined, userCollection);
          }
        }
      }
    },
    request,
    response;

  before(function (done) {
    request = {
    };

    response = {
      send: sinon.stub()
    };

    userController = require('../../server/account/userController.js')(userSpy);

    done();
  });

  describe('GET users', function() {
    it('returns a collection of users', function (done) {
      userController.users(request, response);

      response.send.should.have.been.calledWith(userCollection);

      done();
    });
  });
});