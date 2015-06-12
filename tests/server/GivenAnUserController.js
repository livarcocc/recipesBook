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
});