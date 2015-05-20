angular.module(ApplicationConfiguration.applicationModuleName)
  .controller("rbLoginController", function($scope, rbNotifier, rbIdentity, rbAuthentication, $location) {
    var redirectWhenAuthenticatedAndAtLogin = function () {
      var url = $location.url();
      if(rbIdentity.isAuthenticated() && url.indexOf('/login') !== -1)
      {
        $location.path('/');
      }
    };

    $scope.identity = rbIdentity;

    redirectWhenAuthenticatedAndAtLogin();

    $scope.login = function(username, password) {
      var authenticate = rbAuthentication.authenticate(username, password);
      authenticate.then(function() {
        rbNotifier.success('You have successfully signed in.');
      }, function (message) {
        $scope.errorMessage = message;
        rbNotifier.error(message);
        $location.path('/login');
      });
    };

    $scope.logout = function () {
      rbAuthentication.logoutUser().then(function () {
        $scope.username = '';
        $scope.password = '';
        rbNotifier.success('You successfully logged out!');
        $location.path('/');
      });
    };
});