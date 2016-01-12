angular.module(ApplicationConfiguration.applicationModuleName)
  .controller("rbShowRecipeController", function ($scope, $routeParams, rbRecipe) {
    rbRecipe.get({recipesBook: $routeParams.recipesBook, recipe: $routeParams.recipe}, function (recipe) {
      $scope.recipe = recipe;
      $scope.splitIngredients = Math.ceil(recipe.ingredients.length/2);
    });
  });