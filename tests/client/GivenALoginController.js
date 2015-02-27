'use strict';

describe('The Login controller', function () {
  var loginController,
      scope,
      rbIdentity,
      rbAuthentication,
      rbNotifier,
      deferred;

  beforeEach(module(ApplicationConfiguration.applicationModuleName));

  beforeEach(
    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();

      rbIdentity = 'identityService';

      rbNotifier = {
        success: sinon.spy(),
        error: sinon.spy()
      };

      deferred = {
        then: function(success, error) {
          this.success = success;
          this.error = error;
        }
      };
      rbAuthentication = {
        authenticate: sinon.stub()
      };

      rbAuthentication.authenticate.returns(deferred);

      loginController = $controller('rbLoginController', {
        $scope: scope,
        rbIdentity: rbIdentity,
        rbNotifier: rbNotifier,
        rbAuthentication: rbAuthentication
      });
    }));

  describe('Login', function () {
    it('sets the identity service in the $scope', function () {
      scope.login();

      scope.identity.should.equal(rbIdentity);
    });

    it('should login with a correct user and password', function() {
      scope.login('username', 'password');

      deferred.success();

      rbAuthentication.authenticate.should.have.been.calledWith('username', 'password');
      rbNotifier.success.should.have.been.calledWith('You have successfully signed in.');
    });

    it('should fail to login with no parameters', function() {
      var message = 'Missing credentials';

      scope.login();

      deferred.error(message);

      rbAuthentication.authenticate.should.have.been.calledWith();
      rbNotifier.error.should.have.been.calledWith(message);
    });

    it('should fail to login with invalid credentials', function() {
      var message = 'Invalid credentials';
      var invalidUsername = 'invalidUsername';
      var invalidPassword = 'invalidPassword';

      scope.login(invalidUsername, invalidPassword);

      deferred.error(message);

      rbAuthentication.authenticate.should.have.been.calledWith(invalidUsername, invalidPassword);
      rbNotifier.error.should.have.been.calledWith(message);
    });
  });
});

