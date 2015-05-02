angular.module(ApplicationConfiguration.applicationModuleName)
  .controller("rbSignUpController", function ($scope, rbNotifier, rbIdentity, rbUser, $location) {

    $scope.signUp = function() {
      var newUser = new rbUser({
        email: $scope.email,
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        password: $scope.password
      });

      newUser.$save().then(function () {
        rbIdentity.currentUser = newUser;
        rbNotifier.success('User account created!');
        $location.path('/');
      }, function (response) {
        rbNotifier.error(response.data.reason);
      });
    };
});