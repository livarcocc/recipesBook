angular.module(ApplicationConfiguration.applicationModuleName)
  .controller("rbAddOrUpdateRecipeController", function ($scope, rbRecipe, rbNotifier, $location) {
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
        unit: "pound(s)",
        name: "",
        preparation: ""
      }
    ];

    $scope.addIngredient = function () {
      counter++;
      $scope.ingredients.push({
        id: counter,
        quantity: "",
        unit: "pound(s)",
        name: "",
        preparation: ""
      });
    };

    $scope.removeIngredient = function (ingredientId) {
      var index = _.findIndex($scope.ingredients, function (item) {
        return item.id == ingredientId;
      });

      if(index > -1) {
        $scope.ingredients.splice(index, 1);
      }
    };

    $scope.saveRecipe = function () {
      var newRecipe = new rbRecipe({
        name: $scope.name,
        description: $scope.description,
        ingredients: $scope.ingredients,
        directions: $scope.directions,
        preparationTime: $scope.preparationTime,
        cookingTime: $scope.cookingTime,
        numberOfServings: $scope.numberOfServings
      });

      newRecipe.$save().then(function () {
        rbNotifier.success('Recipe saved!');
        $location.path('/recipes/' + rbRecipe.id);
      }, function (response) {
        rbNotifier.error(response.data.reason);
      });
    };
  });
