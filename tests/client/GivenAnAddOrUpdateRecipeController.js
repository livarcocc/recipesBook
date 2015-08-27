'use strict';

describe('The AddOrUpdateRecipe controller', function () {
  var controller,
    scope,
    rbRecipe,
    save,
    saveDeferred;

  beforeEach(module(ApplicationConfiguration.applicationModuleName));

  beforeEach(
    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      rbRecipe = sinon.stub();
      save = sinon.stub();

      saveDeferred = {
        then: function (success, error) {
          this.success = success;
          this.error = error;
        }
      };

      save.returns(saveDeferred);

      var newRecipe = {
        $save: save
      };

      rbRecipe.returns(newRecipe);

      controller = $controller('rbAddOrUpdateRecipeController', {
        $scope: scope,
        rbRecipe: rbRecipe
      });
    }));

  describe('the list of measurements', function () {
    it('exists', function () {
      should.exist(scope.measurements);
    });

    it('has items with name and measurement type', function () {
      _.each(scope.measurements, function (measurement) {
        should.exist(measurement.name);
        should.exist(measurement.type);

        if(measurement.type !== 'imperial' && measurement.type !== 'metric') {
          assert.fail();
        }
      });

      scope.measurements.length.should.be.at.least(1);
    });
  });

  describe('Adding an ingredient', function () {
    beforeEach(function () {
      scope.addIngredient();
    });

    it('adds a new item to the list of ingredients', function () {
      scope.ingredients.length.should.equal(2);
    });

    it('increases the id of the ingredient by one', function () {
      scope.ingredients[1].id.should.equal(1);
    });
  });

  describe('Deleting an ingredient', function () {
    var idOutOfOrder = 44,
      nonExistingItemId = 991,
      nonExistingIndex = -1,
      numberOfIngredients;

    beforeEach(function () {
      scope.addIngredient();
      scope.addIngredient();
      scope.ingredients[1].id = idOutOfOrder;

      numberOfIngredients = scope.ingredients.length;
    });

    it('does not do anything, if it does not find the item', function () {
      scope.removeIngredient(nonExistingItemId);

      scope.ingredients.length.should.equal(numberOfIngredients);
    });

    it('only removes the item with the specified id', function () {
      scope.removeIngredient(idOutOfOrder);

      scope.ingredients.length.should.equal(numberOfIngredients - 1);
    });

    it('removes the ingredient based on the id', function () {
      scope.removeIngredient(idOutOfOrder);

      var index = _.findIndex(scope.ingredients, function (item) {
        return item.id == idOutOfOrder;
      });

      index.should.equal(nonExistingIndex);
    });
  });

  describe('The AddRecipe controller', function () {
    it('sets the scope.createOrEditRecipeLegend to the add recipe value', function () {
      scope.createOrEditRecipeLegend.should.equal('Create a new Recipe');
    });

    it('defines an array ingredients with one item', function () {
      scope.ingredients.length.should.equal(1);
    });

    it('sets the id of the first ingredient to 0', function () {
      scope.ingredients[0].id.should.equal(0);
    });

    describe('Adding a recipe', function () {
      var name = 'recipeName',
        description = 'recipeDescription',
        ingredients = [{
          id: 0,
          name: 'ingredient',
          preparation: 'chopped',
          quantity: 10,
          unity: 'pound(s)'
        }],
        directions = 'recipeDirections',
        preparationTime = '15 minutes',
        cookingTime = '30 minutes',
        numberOfServings = 4;

      beforeEach(function () {
        scope.name = name;
        scope.description = description;
        scope.ingredients = ingredients;
        scope.directions = directions;
        scope.preparationTime = preparationTime;
        scope.cookingTime = cookingTime;
        scope.numberOfServings = numberOfServings;

        scope.saveRecipe();
      });

      it('creates a new recipe with information from the $scope', function () {
        rbRecipe.should.have.been.calledWith({
          name: name,
          description: description,
          ingredients: ingredients,
          directions: directions,
          preparationTime: preparationTime,
          cookingTime: cookingTime,
          numberOfServings: numberOfServings
        });
      });

      it('calls $save on the resource', function () {
        save.should.have.been.called;
      });
    });
  });
});
