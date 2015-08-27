angular.module(ApplicationConfiguration.applicationModuleName).factory('rbRecipe', function ($resource) {
  return $resource('/api/recipes/:id', {_id: '@id'});
});