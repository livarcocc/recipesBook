'use strict';

angular.module(ApplicationConfiguration.applicationModuleName).factory('rbIdentity', function ($window, rbUser) {
  var currentUser = undefined;
  if(!!$window.bootstrappedUserObject)  {
    currentUser = new rbUser();
    angular.extend(currentUser, $window.bootstrappedUserObject);
  }

  return {
    currentUser: currentUser,
    isAuthenticated: function () {
      return !!this.currentUser;
    }
  };
});

