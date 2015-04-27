'use strict';

describe('The Identity Service', function () {
  var rbIdentity;

  beforeEach(module(ApplicationConfiguration.applicationModuleName));

  describe('when the server sends a user back', function () {
    beforeEach(module(function ($provide) {
      $provide.value('$window', {
        bootstrappedUserObject: 'user'
      });
    }));

    beforeEach(inject(function (_rbIdentity_) {
      rbIdentity = _rbIdentity_;
    }));

    it('sets the currentUser when the server sends a user', function () {
      rbIdentity.currentUser.should.exist;
    });
  });

  describe('when the server does not send a user back', function () {
    beforeEach(module(function ($provide) {
      $provide.value('$window', {
        bootstrappedUserObject: undefined
      });
    }));

    beforeEach(inject(function (_rbIdentity_) {
      rbIdentity = _rbIdentity_;
    }));

    it('sets the currentUser to undefined when the server does not sends a user', function () {
      expect(rbIdentity.currentUser).to.not.exist;
    });
  });

  it('defines a currentUser property', function () {
    rbIdentity.should.include.key('currentUser');
  });

  describe('isAuthenticated', function () {
    it('returns true when there is a currentUser', function() {
      rbIdentity.currentUser = 'user';

      rbIdentity.isAuthenticated().should.be.true;
    });

    it('returns false when there is not a currentUser', function() {
      rbIdentity.currentUser = undefined;

      rbIdentity.isAuthenticated().should.be.false;
    });
  });
});