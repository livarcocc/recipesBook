'use strict';

var ApplicationConfiguration = (function () {
  var applicationModuleName = 'recipesBook';
  var applicationModuleVendorDependencies = ['ngResource', 'ngRoute'];

  return {
    applicationModuleName: applicationModuleName,
    applicationModuleVendorDependencies: applicationModuleVendorDependencies
  }
})();

