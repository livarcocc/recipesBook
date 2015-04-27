'use strict';

describe('The User resource', function () {
  var rbUser;

  beforeEach(module(ApplicationConfiguration.applicationModuleName));

  beforeEach(inject(function(_rbUser_) {
    rbUser = _rbUser_;
  }));

  it('does nothing', function () {

  });
});
