angular.module(ApplicationConfiguration.applicationModuleName)
  .controller("rbAddOrUpdateRecipeController", function ($scope) {
    $scope.createOrEditRecipeLegend = 'Create a new Recipe';

    var counter = 0;

    $scope.ingredients = [
      {
        id: counter,
        quantity: "",
        unit: "lb",
        name: "",
        preparation: ""
      }
    ];

    $scope.addIngredient = function () {
      counter++;
      $scope.ingredients.push({
        id: counter,
        quantity: "",
        unit: "lb",
        name: "",
        preparation: ""
      });
    };

    $scope.removeIngredient = function(ingredientId) {
    };
  });
