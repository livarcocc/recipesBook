'use strict';

angular.module(ApplicationConfiguration.applicationModuleName).factory('rbAuthentication', function ($http, rbIdentity, $q, rbUser) {
  return {
    authenticate: function(username, password) {
      var deferred = $q.defer();

      $http.post('/auth/signin', {username: username, password: password}).
        success(function(response) {
          var user = new rbUser();
          angular.extend(user, response.data);
          rbIdentity.currentUser = user;

          deferred.resolve();
        }).
        error(function(response) {
          deferred.reject(response.message);
        });

      return deferred.promise;
    },
    logoutUser: function () {
      var deferred = $q.defer();

      $http.post('/auth/signout', {logout: true}).success(function () {
        rbIdentity.currentUser = undefined;
        deferred.resolve();
      });

      return deferred.promise;
    }
  };
});