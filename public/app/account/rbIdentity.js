'use strict';

angular.module(ApplicationConfiguration.applicationModuleName).factory('rbIdentity', function () {
  return {
    currentUser: undefined,
    isAuthenticated: function () {
      return !!this.currentUser;
    }
  };
});

