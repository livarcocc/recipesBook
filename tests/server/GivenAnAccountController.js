'use strict';

var chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require("sinon-chai");

chai.should();
chai.use(sinonChai);

describe('The Account controller', function () {
  var accountController,
      authenticateCallback,
      info = 'info',
      passportSpy = {
        authenticate: undefined
      },
      request,
      response,
      user = {
        password: 'password',
        salt: 'salt'
      },
      username = 'USERNAME';

  before(function (done) {
    request = {
      login: sinon.spy(),
      body: {
        username: username
      }
    };

    response = {
      status: sinon.stub(),
      send: sinon.stub(),
      json: sinon.spy()
    };

    response.status.returns(response);

    authenticateCallback = sinon.spy();

    passportSpy.authenticate = sinon.stub().returns(authenticateCallback);

    accountController = require('../../server/account/accountController.js')(passportSpy);

    done();
  });

  describe('signin', function() {
    it('calls passport.authenticateCallback with local strategy', function (done) {
      accountController.signin(request);

      passportSpy.authenticate.should.have.been.calledWith('local');

      done();
    });

    it('sets req.body.username to lower case', function (done) {
      accountController.signin(request);

      request.body.username.should.equal(username.toLowerCase());

      done();
    });

    it('immediately invokes the function returned by passport.authenticateCallback', function (done) {
      var res = 'res',
          next = function (){};

      accountController.signin(request, res, next);

      authenticateCallback.should.have.been.calledWith(request, res, next);

      done();
    });

    it('returns 400 when there is an error when authenticating', function (done) {
      passportSpy.authenticate = sinon.stub().callsArgWith(1, 'err', undefined, info).returns(authenticateCallback);

      accountController.signin(request, response, response);

      response.status.should.have.been.calledWith(400);
      response.send.should.have.been.calledWith(info);

      done();
    });

    it('returns 400 when no user is returned', function (done) {
      passportSpy.authenticate = sinon.stub().callsArgWith(1, undefined, undefined, info).returns(authenticateCallback);

      accountController.signin(request, response, response);

      response.status.should.have.been.calledWith(400);
      response.send.should.have.been.calledWith(info);

      done();
    });

    it('removes user.password and user.salt when invoking req.login', function (done) {
      var userWithoutPassord = {
        password: undefined,
        salt: undefined
      };

      passportSpy.authenticate = sinon.stub().callsArgWith(1, undefined, user, info).returns(authenticateCallback);

      accountController.signin(request, response, response);

      request.login.should.have.been.calledWith(userWithoutPassord);

      done();
    });

    it('returns 400 when there is an error during req.login', function (done) {
      var err = 'err';
      request.login = sinon.stub().callsArgWith(1, err);

      accountController.signin(request, response, response);

      response.status.should.have.been.calledWith(400);
      response.send.should.have.been.calledWith(err);

      done();
    });

    it('sends the user back as json when signin succeeds', function (done) {
      var err = 'err';
      request.login = sinon.stub().callsArgWith(1, undefined);

      accountController.signin(request, response, response);

      response.json.should.have.been.calledWith({data: user});

      done();
    });
  });

  describe('signout', function () {
    var request,
      response;

    before(function () {
      request = {
        logout: sinon.stub()
      };

      response = {
        end: sinon.stub()
      };

      accountController.signout(request, response);
    });

    it('invokes sign-out on the request', function () {
      request.logout.should.have.been.called;
    });

    it('ends the response', function () {
      response.end.should.have.been.called;
    });
  });
});