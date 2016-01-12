'use strict';

describe('The Show Recipe controller that displays a recipe', function () {
  var scope,
    controller,
    rbRecipe,
    recipe = {
      ingredients: [{}, {}, {}]
    },
    recipesBookId = 'recipesBook',
    recipeId = 'recipe';

  beforeEach(module(ApplicationConfiguration.applicationModuleName));

  beforeEach(
    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();

      var rbRecipeGetStub = sinon.stub();
      rbRecipeGetStub.callsArgWith(1, recipe);

      rbRecipe = {
        get: rbRecipeGetStub
      };

      var routeParams = {
        recipesBook: recipesBookId,
        recipe: recipeId
      };

      controller = $controller('rbShowRecipeController', {
        $scope: scope,
        $routeParams: routeParams,
        rbRecipe: rbRecipe
      });
    }));

  describe('The GET Recipe', function () {
    it('calls get from the rbRecipe', function () {
      rbRecipe.get.should.have.been.called;
    });

    it('uses the recipe book id and recipe id from the URL to get the recipe', function () {
      rbRecipe.get.should.have.been.calledWith({
        recipesBook: recipesBookId,
        recipe: recipeId
      });
    });

    it('sets the recipe to $scope.recipe', function () {
      scope.recipe.should.equal(recipe);
    });

    it('sets the scope.splitIngredients to the middle of the ingredients array', function () {
      scope.splitIngredients.should.equal(Math.ceil(recipe.ingredients.length/2));
    });
  });
});