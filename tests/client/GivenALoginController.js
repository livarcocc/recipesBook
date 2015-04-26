'use strict';

describe('The Login controller', function () {
  var loginController,
    scope,
    rbIdentity,
    rbAuthentication,
    rbNotifier,
    loginDeferred,
    logoutDeferred,
    location,
    isAuthenticated;

  beforeEach(module(ApplicationConfiguration.applicationModuleName));

  beforeEach(
    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();

      isAuthenticated = sinon.stub();
      isAuthenticated.returns(true);
      rbIdentity = {
        isAuthenticated: isAuthenticated
      };

      rbNotifier = {
        success: sinon.spy(),
        error: sinon.spy()
      };

      loginDeferred = {
        then: function(success, error) {
          this.success = success;
          this.error = error;
        }
      };
      logoutDeferred = {
        then: function(success, error) {
          this.success = success;
          this.error = error;
        }
      };
      rbAuthentication = {
        authenticate: sinon.stub(),
        logoutUser: sinon.stub()
      };

      rbAuthentication.authenticate.returns(loginDeferred);
      rbAuthentication.logoutUser.returns(logoutDeferred);

      var url = sinon.stub();
      url.returns('/#/login');
      location = {
        path: sinon.stub(),
        url: url
      };

      loginController = $controller('rbLoginController', {
        $scope: scope,
        rbIdentity: rbIdentity,
        rbNotifier: rbNotifier,
        rbAuthentication: rbAuthentication,
        $location: location
      });
    }));

  describe('Login', function () {
    var invalidUsername = 'invalidUsername',
        invalidPassword = 'invalidPassword',
        username = 'username',
        password = 'password';

    it('sets the identity service in the $scope', function () {
      scope.login();

      scope.identity.should.equal(rbIdentity);
    });

    it('should login with a correct user and password', function() {
      scope.login(username, password);

      loginDeferred.success();

      rbAuthentication.authenticate.should.have.been.calledWith(username, password);
      rbNotifier.success.should.have.been.calledWith('You have successfully signed in.');
    });

    it('should fail to login with no parameters', function() {
      var message = 'Missing credentials';

      scope.login();

      loginDeferred.error(message);

      rbAuthentication.authenticate.should.have.been.calledWith();
      rbNotifier.error.should.have.been.calledWith(message);
    });

    it('should fail to login with invalid credentials', function() {
      var message = 'Invalid credentials';

      scope.login(invalidUsername, invalidPassword);

      loginDeferred.error(message);

      rbAuthentication.authenticate.should.have.been.calledWith(invalidUsername, invalidPassword);
      rbNotifier.error.should.have.been.calledWith(message);
    });

    it('redirects the user to /login when login fails', function () {
      scope.login(invalidUsername, invalidPassword);

      loginDeferred.error();

      location.path.should.have.been.calledWith('/login');
    });

    it('redirects the user to root(/) when the user is already logged in', function () {
      scope.login(username, password);

      loginDeferred.success();

      location.path.should.have.been.calledWith('/');
    });
  });

  describe('Logout', function () {
    beforeEach(function () {
      scope.username = 'username';
      scope.password = 'password';

      scope.logout();

      logoutDeferred.success();
    });

    it('should logout the user', function() {
      rbAuthentication.logoutUser.should.have.been.called;
    });

    it('should clear out username and password', function() {
      scope.username.should.be.empty;
      scope.password.should.be.empty;
    });

    it('should notify the user of success', function () {
      rbNotifier.success.should.have.been.calledWith('You successfully logged out!');
    });

    it('should redirect the user to root (/)', function () {
      location.path.should.have.been.calledWith('/');
    });
  });
});

