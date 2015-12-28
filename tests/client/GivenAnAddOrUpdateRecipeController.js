'use strict';

describe('The AddOrUpdateRecipe controller', function () {
  var controller,
    scope,
    rbRecipe,
    rbNotifier,
    rbMeasurements,
    rbRecipesBook,
    location,
    saveNewRecipe,
    saveNewRecipeDeffered,
    saveNewRecipesBookDeffered,
    saveNewRecipesBook,
    recipesBooks = [
      {
        _id: 1,
        name: 'Any name 1'
      },
      {
        _id: 2,
        name: 'Any name 2'
      }
    ];

  beforeEach(module(ApplicationConfiguration.applicationModuleName));

  beforeEach(
    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      rbRecipe = sinon.stub();
      rbMeasurements = {
        query: function (params, success) {
              success([
                {
                  name: 'pound(s)',
                  type: 'imperial'
                }
              ]);
            }
          };

      var recipesBookQueryStub = sinon.stub();
      recipesBookQueryStub.callsArgWith(0, recipesBooks);

      saveNewRecipesBookDeffered = {
        then: function (success, error) {
          this.success = success;
          this.error = error;
        }
      };

      saveNewRecipesBook = sinon.stub();
      saveNewRecipesBook.returns(saveNewRecipesBookDeffered);

      rbRecipesBook = function () {
          this.$save= saveNewRecipesBook
        };

      rbRecipesBook.query = recipesBookQueryStub;

      saveNewRecipe = sinon.stub();
      rbNotifier = {
        success: sinon.spy(),
        error: sinon.spy()
      };
      location = {
        path: sinon.spy()
      };

      saveNewRecipeDeffered = {
        then: function (success, error) {
          this.success = success;
          this.error = error;
        }
      };

      saveNewRecipe.returns(saveNewRecipeDeffered);

      var newRecipe = {
        $save: saveNewRecipe
      };

      rbRecipe.returns(newRecipe);

      controller = $controller('rbAddOrUpdateRecipeController', {
        $scope: scope,
        rbRecipe: rbRecipe,
        rbNotifier: rbNotifier,
        $location: location,
        rbMeasurement: rbMeasurements,
        rbRecipesBook: rbRecipesBook
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

  describe('the list of recipes books', function () {
    it('queries the rbRecipesBook service for the list', function () {
      rbRecipesBook.query.should.have.been.called;
    });

    it('adds the returned recipes books to $scope.cookBooks', function () {
      scope.cookBooks.length.should.equal(3);
    });

    describe('Adding a cookbook', function () {
      describe('$save', function () {
        beforeEach(function () {
          scope.newCookBookName = 'new recipe book';

          scope.saveCookBook();
        });

        it('invokes $save in the rbRecipesBook service', function () {
          saveNewRecipesBook.should.have.been.called;
        });

        it('notifies of an error when $save fails', function () {
          var reason = 'Injected error';
          saveNewRecipesBookDeffered.error({ data: {reason: reason}});

          rbNotifier.error.should.have.been.calledWith(reason);
        });

        describe('success', function () {
          var previousCookBooksCount;

          beforeEach(function () {
            previousCookBooksCount = scope.cookBooks.length;

            saveNewRecipesBookDeffered.success({ _id: 'new id'});
          });

          it('adds the new cookbook to the list of cookbooks', function () {
            scope.cookBooks.length.should.equal(previousCookBooksCount + 1);
          });

          it('resets the newCookBookName property to empty', function () {
            scope.newCookBookName.should.be.empty;
          });

          it('notifies that the cook book was added successfully', function () {
            rbNotifier.success.should.have.been.calledWith('Recipes Book saved!');
          });
        });
      });

      it('notifies an error if $scope.newCookBookName is not set', function () {
        scope.newCookBookName = '';

        scope.saveCookBook();

        saveNewRecipesBook.should.have.not.been.called;
        rbNotifier.error.should.have.been.calledWith('Recipes Book name is required!');
      });
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
        numberOfServings = 4,
        cookbook = 1,
        newRecipeId = 22,
        newRecipe = {
          id: newRecipeId
        };

      beforeEach(function () {
        scope.name = name;
        scope.description = description;
        scope.ingredients = ingredients;
        scope.directions = directions;
        scope.preparationTime = preparationTime;
        scope.cookingTime = cookingTime;
        scope.numberOfServings = numberOfServings;
        scope.cookbook = cookbook;

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
          numberOfServings: numberOfServings,
          cookbook: cookbook
        });
      });

      it('calls $save on the resource', function () {
        saveNewRecipe.should.have.been.called;
      });

      describe('when successfully', function () {
        beforeEach(function () {
          saveNewRecipeDeffered.success(newRecipe);
        });

        it('notifies that the save was successful', function () {
          rbNotifier.success.should.have.been.calledWith('Recipe saved!');
        });

        it('sets the page to the details page of the new recipe', function () {
          location.path.should.have.been.calledWith('/recipes/' + newRecipeId);
        });
      });

      describe('when fails', function () {
        var failureReason = 'it is supposed to fail.';

        beforeEach(function () {
          saveNewRecipeDeffered.error({
            data: {
              reason: failureReason
            }
          });
        });

        it('notifies that the save failed', function () {
          rbNotifier.error.should.have.been.calledWith(failureReason);
        });
      });
    });
  });
});
