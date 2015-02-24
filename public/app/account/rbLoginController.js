angular.module(ApplicationConfiguration.applicationModuleName).controller("rbLoginController", function($scope, $http) {
  $scope.login = function(username, password) {
    $http.post('/auth/signin', {username: username, password: password}).
      success(function() {
        $scope.logged = true;
      }).
      error(function(response) {
        $scope.error = response.message;
      });
  };
});