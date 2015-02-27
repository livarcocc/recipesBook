'use strict';

describe('The Identity Service', function () {
  var rbIdentity;

  beforeEach(module(ApplicationConfiguration.applicationModuleName));

  beforeEach(inject(function (_rbIdentity_) {
    rbIdentity = _rbIdentity_;
  }));

  it('defines a currentUser property', function () {
    rbIdentity.should.include.key('currentUser');
  });

  describe('isAuthenticated', function () {
    it('returns true when there is a currentUser', function() {
      rbIdentity.currentUser = 'user';

      rbIdentity.isAuthenticated().should.be.true;
    });

    it('returns false when there is not a currentUser', function() {
      rbIdentity.isAuthenticated().should.be.false;
    });
  });
});