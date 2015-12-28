angular.module(ApplicationConfiguration.applicationModuleName).factory('rbRecipesBook', function (rbIdentity, $resource) {
  return $resource('/api/users/:user/recipesBooks/:recipesBook', {user: rbIdentity.currentUser._id, _id: '@recipesBook'});
});