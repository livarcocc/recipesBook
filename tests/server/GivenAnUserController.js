'use strict';

var chai = require('chai'),
  should = require('chai').should(),
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
    next = sinon.spy(),
    request,
    response;

  before(function (done) {
    request = {
    };

    response = {
      status: sinon.spy(),
      send: sinon.stub(),
      end: sinon.spy()
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

  describe('Create user', function () {
    var firstName = 'firstName',
      lastName = 'lastName',
      upperCaseEmail = 'EMAIL@EMAIL.COM',
      actualNewUser = {},
      actualCallback = function () {},
      newUser = {
        password: 'password',
        salt: 'salt'
      };

    before(function (done) {
      request = {
        body: {
          firstName: firstName,
          lastName: lastName,
          email: upperCaseEmail
        },
        logIn: sinon.spy()
      };

      done();
    });

    beforeEach(function (done) {
      actualNewUser = {};
      actualCallback = function () {};

      userSpy.create = function (newUser, callback) {
        actualNewUser = newUser;
        actualCallback = callback;
      };

      userController.createUser(request, response, next);

      done();
    });

    it('sets the DisplayName to firstName + lastName', function (done) {
      actualNewUser.displayName.should.equal(firstName + ' ' + lastName);

      done();
    });

    it('sets the userName to lowercase', function (done) {
      actualNewUser.userName.should.equal(upperCaseEmail.toLowerCase());

      done();
    });

    it('sets the provider to "local"', function (done) {
      actualNewUser.provider.should.equal('local');

      done();
    });

    it('sends a 400 with a reason when user.create fails', function (done) {
      actualCallback('error');

      response.status.should.have.been.calledWith(400);
      response.send.should.have.been.calledWith({reason: 'error'});

      done();
    });

    it('sends a 400 with an updated reason when user.create fails with E11000', function (done) {
      actualCallback('E11000');

      response.status.should.have.been.calledWith(400);
      response.send.should.have.been.calledWith({reason: 'Error: Duplicate username'});

      done();
    });

    it('removes the salt and password from the newUser when sending it back', function (done) {
      actualCallback(undefined, newUser);

      should.not.exist(newUser.password);
      should.not.exist(newUser.salt);

      done();
    });

    it('calls request.logIn when the user is created successfully', function (done) {
      actualCallback(undefined, newUser);

      request.logIn.should.have.been.calledWith(newUser);

      done();
    });

    it('passes the error to the next function in the middleware when logIn fails', function (done) {
      actualCallback(undefined, newUser);

      request.logIn.args[0][1]('error');
      next.should.have.been.calledWith('error');

      done();
    });

    it('sends the user back in the response when logIn succeeds', function (done) {
      actualCallback(undefined, newUser);

      request.logIn.args[0][1]();

      response.send.should.have.been.calledWith(newUser);

      done();
    });
  });

  describe('pre load user', function () {
    var next,
      userId = 'any user id';

    beforeEach(function (done) {
      next = sinon.spy();

      done();
    });

    it('returns 403 if the user in the URI does not match the signed in user', function (done) {
      request.user  = {
        _id: 'different user id'
      };

      userController.preLoadUser(request, response, next, userId);

      response.status.should.have.been.calledWith(403);
      response.end.should.have.been.called;
      next.should.not.have.been.called;

      done();
    });

    it('invokes the next function in the chain when the signed in user and the uri user match', function (done) {
      request.user = {
        _id: userId
      };

      userController.preLoadUser(request, response, next, userId);

      next.should.have.been.called;

      done();
    });
  });
});