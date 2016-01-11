angular.module(ApplicationConfiguration.applicationModuleName)
  .controller("rbShowRecipeController", function ($scope, $routeParams, rbRecipe) {
    rbRecipe.get({recipesBook: $routeParams.recipesBook, recipe: $routeParams.recipe}, function (recipe) {
      $scope.recipe = recipe;
    });
  });