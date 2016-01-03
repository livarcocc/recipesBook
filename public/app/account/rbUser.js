angular.module(ApplicationConfiguration.applicationModuleName).factory('rbUser', function ($resource) {
  return $resource('/api/users/:id', {id: '@_id'});
});