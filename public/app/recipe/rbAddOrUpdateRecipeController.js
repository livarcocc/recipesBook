angular.module(ApplicationConfiguration.applicationModuleName)
  .controller("rbAddOrUpdateRecipeController", function ($scope, rbRecipe, rbNotifier, $location, rbMeasurement, rbRecipesBook) {
    $scope.createOrEditRecipeLegend = 'Create a new Recipe';

    var counter = 0;

    rbMeasurement.query({type: 'Imperial'},
      function (measurements) {
        $scope.measurements = measurements;
      },
      function (response) {
        rbNotifier.error(response.data.reason);

        $scope.measurements = [
          {
            name: 'pound(s)',
            type: 'imperial'
          }
        ];
      });

    $scope.ingredients = [
      {
        id: counter,
        quantity: "",
        unit: "pound(s)",
        name: "",
        preparation: ""
      }
    ];

    $scope.cookBooks = [
      {name: "Please, select a cookbook"}
    ];

    rbRecipesBook.query(function (recipesBooks) {
      Array.prototype.push.apply($scope.cookBooks, recipesBooks);
    });

    $scope.addIngredient = function () {
      counter++;
      $scope.ingredients.push({
        id: counter,
        quantity: "",
        measurement: {},
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
        ingredients: _.map($scope.ingredients, function (ingredient) {
          ingredient.measurement = ingredient.measurement._id;
          return ingredient;
        }),
        directions: $scope.directions,
        preparationTime: $scope.preparationTime,
        cookingTime: $scope.cookingTime,
        numberOfServings: $scope.numberOfServings,
        recipesBook: $scope.cookBook._id
      });

      newRecipe.$save().then(function (recipe) {
        _.extend(recipe, newRecipe);
        rbNotifier.success('Recipe saved!');
        $location.path('/recipes/' + recipe._id);
      }, function (response) {
        rbNotifier.error(response.data.reason);
      });
    };

    $scope.saveCookBook = function () {
      if(!$scope.newCookBookName || $scope.newCookBookName === '') {
        rbNotifier.error('Recipes Book name is required!');
        return;
      }

      var newCookBook = new rbRecipesBook({name: $scope.newCookBookName});

      newCookBook.$save().then(function (recipesBook) {
        _.extend(recipesBook, newCookBook);
        $scope.cookBooks.push(recipesBook);
        $scope.newCookBookName = ''
        rbNotifier.success('Recipes Book saved!');
      }, function (response) {
        rbNotifier.error(response.data.reason);
      });
    };
  });
