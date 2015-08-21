angular.module(ApplicationConfiguration.applicationModuleName)
  .controller("rbAddOrUpdateRecipeController", function ($scope) {
    $scope.createOrEditRecipeLegend = 'Create a new Recipe';

    var counter = 0;

    $scope.measurements = [
      {
        name: 'pound(s)',
        type: 'imperial'
      }
    ];

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
      var index = _.findIndex($scope.ingredients, function (item) {
        return item.id == ingredientId;
      });

      if(index > -1) {
        $scope.ingredients.splice(index, 1);
      }
    };
  });
