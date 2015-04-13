angular.module(ApplicationConfiguration.applicationModuleName).controller("rbLoginController", function($scope, rbNotifier, rbIdentity, rbAuthentication, $location) {
  $scope.login = function(username, password) {
    $scope.identity = rbIdentity;

    var authenticate = rbAuthentication.authenticate(username, password);
    authenticate.then(function() {
      rbNotifier.success('You have successfully signed in.');
    }, function (message) {
      $scope.errorMessage = message;
      rbNotifier.error(message);
      $location.path('/login');
    });
  };
});