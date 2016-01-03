angular.module(ApplicationConfiguration.applicationModuleName).factory('rbRecipe', function (rbIdentity, $resource) {
  return $resource(
    '/api/users/:user/recipesBooks/:recipesBook/recipes/:recipe',
    {user: rbIdentity.currentUser._id, recipesBook: '@recipesBook', recipe: '@_id'});
});