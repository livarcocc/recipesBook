'use strict';

describe('The Authentication Service', function () {
  var rbAuthentication,
      rbIdentity,
      $httpBackend;

  var username = 'username',
      password = 'password',
      invalidUsername = 'invalidUsername',
      errorMessage = 'Auth failed';

  beforeEach(module(ApplicationConfiguration.applicationModuleName));

  beforeEach(inject(function (_rbIdentity_, _$httpBackend_, _rbAuthentication_) {
    $httpBackend = _$httpBackend_;

    rbAuthentication = _rbAuthentication_;
    rbIdentity = _rbIdentity_;

    $httpBackend.when('POST', '/auth/signin',{username: username, password: password}).respond(200, {data: 'user'});
    $httpBackend.when('POST', '/auth/signin',{username: invalidUsername, password: password}).respond(400, {message: errorMessage});
  }));

  it('sets the identity.currentUser when authentication succeeds', function () {
    rbAuthentication.authenticate(username, password);
    $httpBackend.flush();

    rbIdentity.currentUser.should.equal('user');
  });

  it('resolves the deferred successfully when authentication succeeds', function () {
    var success = false;

    rbAuthentication.authenticate(username, password).then(function () {
      success = true;
    });
    $httpBackend.flush();

    success.should.be.true;
  });

  it('rejects the deferred with an error message when authentication fails', function () {
    var success = false,
        expectedMessage = undefined;

    rbAuthentication.authenticate(invalidUsername, password).then(function () {}, function (message) {
      expectedMessage = message;
    });
    $httpBackend.flush();

    success.should.be.false;
    expectedMessage.should.equal(errorMessage);
  });
});

