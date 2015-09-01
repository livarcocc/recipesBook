angular.module(ApplicationConfiguration.applicationModuleName)
  .controller("rbAddOrUpdateRecipeController", function ($scope, rbRecipe, rbNotifier, $location) {
    $scope.createOrEditRecipeLegend = 'Create a new Recipe';

    var counter = 0;

    //TODO-livar: Extract a measurements service to be injected
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

    //TODO-livar: Extract a cookbook service as well
    $scope.cookBooks = [
      {name: "Please, select a cookbook"},
      {id: 12, name: "Receitas de Mainha"}
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
        numberOfServings: $scope.numberOfServings,
        cookbook: $scope.cookbook
      });

      newRecipe.$save().then(function (recipe) {
        _.extend(recipe, newRecipe);
        rbNotifier.success('Recipe saved!');
        $location.path('/recipes/' + recipe.id);
      }, function (response) {
        rbNotifier.error(response.data.reason);
      });
    };
  });
