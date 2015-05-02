'use strict';

describe('The SignUp controller', function () {
  var signUpController,
    scope,
    rbIdentity,
    rbUser,
    rbNotifier,
    saveDeferred,
    location,
    save,
    newUser;

  beforeEach(module(ApplicationConfiguration.applicationModuleName));

  beforeEach(
    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();

      rbIdentity = {
        currentUer: undefined
      };

      rbNotifier = {
        success: sinon.spy(),
        error: sinon.spy()
      };

      saveDeferred = {
        then: function(success, error) {
          this.success = success;
          this.error = error;
        }
      };
      rbUser = sinon.stub();

      save = sinon.stub();
      save.returns(saveDeferred);
      newUser = {
        $save: save
      };
      rbUser.returns(newUser);

      location = {
        path: sinon.stub()
      };

      signUpController = $controller('rbSignUpController', {
        $scope: scope,
        rbIdentity: rbIdentity,
        rbNotifier: rbNotifier,
        rbUser: rbUser,
        $location: location
      });
    }));

  describe('SignUp', function () {
    var password = 'password';
    var lastName = 'lastName';
    var firstName = 'firstName';
    var email = 'email';

    beforeEach(function() {
      scope.email = email;
      scope.firstName = firstName;
      scope.lastName = lastName;
      scope.password = password;

      scope.signUp();
    });

    it('uses the information from $scope to create a new user', function () {
      rbUser.should.have.been.calledWith({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password
      });
    });

    it('calls $save on the resource', function () {
      save.should.have.been.called;
    });

    describe('A successful sign up', function () {
      beforeEach(function () {
        saveDeferred.success();
      });

      it('sets the current user in the identity service', function () {
        rbIdentity.currentUser.should.equal(newUser);
      });

      it('redirects the user to root (/)', function () {
        location.path.should.have.been.calledWith('/');
      });

      it('should notify the user of success', function () {
        rbNotifier.success.should.have.been.calledWith('User account created!');
      });
    });

    describe('A failed sign-up', function () {
      var failureReason = 'Failed on test';

      beforeEach(function () {
        saveDeferred.error({
          data: {
            reason: failureReason
          }
        });
      });

      it('notifies the user of the failure', function () {
        rbNotifier.error.should.have.been.calledWith(failureReason);
      });
    });
  });
});

