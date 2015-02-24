'use strict';

describe('The Login controller', function () {
  var loginController,
      scope,
      $httpBackend,
      $location;

  beforeEach(module(ApplicationConfiguration.applicationModuleName));

  beforeEach(
    inject(function($controller, $rootScope, _$httpBackend_, _$location_) {
      scope = $rootScope.$new();

      $httpBackend = _$httpBackend_;
      $location = _$location_;

      loginController = $controller('rbLoginController', {
        $scope: scope
      });
    }));

  describe('Login', function () {
    it('should login with a correct user and password', function() {
      $httpBackend.when('POST', '/auth/signin',{username: 'username', password: 'password'}).respond(200, 'username');

      scope.login('username', 'password');
      $httpBackend.flush();

      scope.logged.should.be.true;
    });

    it('should fail to login with no parameters', function() {
      var message = 'Missing credentials';
      $httpBackend.expectPOST('/auth/signin').respond(400, {'message': message});

      scope.login();
      $httpBackend.flush();

      scope.error.should.equal(message);
    });

    it('should fail to login with invalid credentials', function() {
      var message = 'Invalid credentials';
      var invalidUsername = 'invalidUsername';
      var invalidPassword = 'invalidPassword';

      $httpBackend.when('POST', '/auth/signin',{username: invalidUsername, password: invalidPassword})
        .respond(400, {'message': message});

      scope.login(invalidUsername, invalidPassword);
      $httpBackend.flush();

      scope.error.should.equal(message);
    });
  });
});

