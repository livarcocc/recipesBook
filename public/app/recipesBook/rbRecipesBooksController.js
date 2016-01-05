angular.module(ApplicationConfiguration.applicationModuleName)
  .controller("rbRecipesBooksController", function ($scope, rbRecipesBook) {
    rbRecipesBook.query(function (recipesBooks) {
      $scope.recipesBooks = recipesBooks;
    });
  });