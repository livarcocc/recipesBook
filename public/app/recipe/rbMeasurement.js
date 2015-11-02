angular.module(ApplicationConfiguration.applicationModuleName).factory('rbMeasurement', function ($resource) {
  return $resource('/api/measurements');
});