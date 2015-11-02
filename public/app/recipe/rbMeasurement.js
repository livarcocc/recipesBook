angular.module(ApplicationConfiguration.applicationModuleName).factory('rbMeasurement', function ($resource) {
  return $resource('/api/measurement/:id', {_id: '@id'});
});