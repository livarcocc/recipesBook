'use strict';

var chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require("sinon-chai"),
  should = require('chai').should();

chai.should();
chai.use(sinonChai);

describe('The RecipesBook controller', function () {
  var TestUser = function (id) {
      return {
        _id: id,
        equals: function (otherUser) {
          return otherUser === this._id;
        }
      }
    },
    recipesBooksCollection = ['user1', 'user2'],
    userId = 'anyUserId',
    recipesBookId = 'recipesBookId',
    recipesBook = {_id: recipesBookId, name: 'any name', owner: new TestUser(userId)},
    recipesBookController,
    findByIdId,
    findByIdCallback,
    populate,
    recipesBookSpy,
    request,
    response;

  beforeEach(function (done) {
    request = {
    };

    response = {
      status: sinon.spy(),
      send: sinon.stub(),
      end: sinon.spy()
    };

    recipesBookSpy = {
      find: function(conditional) {
        populate = sinon.stub().returns({
          exec: function (callback) {
            if(conditional.owner === userId) {
              callback(undefined, recipesBooksCollection);
            }
            else {
              callback(undefined, []);
            }
          }
        });

        return {
          populate: populate
        }
      },
      findById: function (id, callback) {
        findByIdId = id;

        findByIdCallback = callback;
      }
    };

    recipesBookController = require('../../server/recipesBook/recipesBookController.js')(recipesBookSpy);

    done();
  });

  describe('GET Recipes Books', function () {
    it('returns all recipe books for a user', function (done) {
      request.user = new TestUser(userId);

      recipesBookController.recipesBooksForUser(request, response);

      response.send.should.have.been.calledWith(recipesBooksCollection);

      done();
    });

    it('populates the recipes _id and name of the recipes books', function (done) {
      populate.should.have.been.calledWith('recipes', '_id name');

      done();
    });

    it('returns no recipe book for a user if the user does not have any', function (done) {
      request.user = {
        _id: 'userWithoutRecipesBook'
      };

      recipesBookController.recipesBooksForUser(request, response);

      response.send.should.have.been.calledWith([]);

      done();
    });
  });

  describe('GET Recipes Book', function () {
    var populateProperty,
      populateRecipesCallback;

    before(function (done) {
      request.user = {
        _id: userId
      };

      done();
    });

    beforeEach(function (done) {
      request.recipesBook = recipesBook;

      request.recipesBook.populate = function (property, callback) {
        populateProperty = property;
        populateRecipesCallback = callback;
      };

      populateProperty = undefined;
      populateRecipesCallback = undefined;

      recipesBookController.recipesBookForUser(request, response);

      done();
    });

    it('calls populate recipes on the Recipes Book', function (done) {
      populateProperty.should.equal('recipes');

      done();
    });

    it('sends a 500 when populate fails', function (done) {
      var error = new Error('Injected error');
      populateRecipesCallback(error);

      response.status.should.have.been.calledWith(500);
      response.send.should.have.been.calledWith({reason: error.toString()});

      done();
    });

    it('sends the new populated recipes book back', function (done) {
      var recipesBookToReturn = {};
      populateRecipesCallback(undefined, recipesBookToReturn);

      response.send.should.have.been.calledWith(recipesBookToReturn);

      done();
    });
  });

  describe('Create recipes book', function () {
    var actualNewRecipesBook = {},
      actualCallback = function () {},
      newRecipesBook = {
        name: 'new recipes book',
        owner: new TestUser(userId)
      };

    beforeEach(function (done) {
      actualNewRecipesBook = {};
      actualCallback = function () {};

      request.body = {
        name: 'recipes book'
      };

      request.user = {
        _id: userId
      };

      recipesBookSpy.create = function (newRecipesBook, callback) {
        actualNewRecipesBook = newRecipesBook;
        actualCallback = callback;
      };

      recipesBookController.createRecipesBook(request, response);

      done();
    });

    it('sets the owner to the user in req.params.userId', function (done) {
      actualNewRecipesBook.owner.should.equal(userId);

      done();
    });

    it('sends a 400 with a reason when recipesBook.create fails', function (done) {
      actualCallback('error');

      response.status.should.have.been.calledWith(400);
      response.send.should.have.been.calledWith({reason: 'error'});

      done();
    });

    it('sends the recipes book back in the response when the creation succeeds', function (done) {
      actualCallback(undefined, newRecipesBook);

      response.send.should.have.been.calledWith(newRecipesBook);

      done();
    });
  });

  describe('Update recipes book', function () {
    var recipesBookUpdatedName = 'new recipes book name',
      updatedRecipesBook,
      saveCallback;

    beforeEach(function (done) {
      request = {
        params: {
          userId: userId,
          recipesBookId: recipesBookId
        },
        body: {
          name: recipesBookUpdatedName
        },
        recipesBook: recipesBook
      };

      recipesBook.save = function (callback) {
        updatedRecipesBook = this;

        saveCallback = callback;
      };

      recipesBookController.updateRecipesBook(request, response);

      done();
    });

    it('sends a 400 when body.name is not set', function (done) {
      recipesBookController.updateRecipesBook({}, response);

      response.status.should.have.been.calledWith(400);
      response.send.should.have.been.calledWith({reason: 'Missing recipes book name.'});

      done();
    });

    it('sends a 500 when it fails to save the recipes book', function (done) {
      var error = new Error('Injected error.');
      saveCallback(error);

      response.status.should.have.been.calledWith(500);
      response.send.should.have.been.calledWith({reason: error.toString()});

      done();
    });

    it('updates the right recipes book', function (done) {
      updatedRecipesBook._id.should.equal(recipesBookId);

      done();
    });

    it('updates the name of the recipes book', function (done) {
      updatedRecipesBook.name.should.equal(recipesBookUpdatedName);

      done();
    });

    it('sends the updated recipes book back', function (done) {
      saveCallback(undefined);

      request.recipesBook.name.should.equal(recipesBookUpdatedName);
      response.send.should.have.been.calledWith(request.recipesBook);

      done();
    });
  });

  describe('DELETE recipes book', function () {
    var removeCallback;

    beforeEach(function () {
      request.recipesBook = recipesBook;

      recipesBook.remove = function (callback) {
        removeCallback = callback;
      };
    });

    it('deletes the recipes book', function (done) {
      recipesBook.remove = sinon.spy();

      recipesBookController.deleteRecipesBook(request, response);

      recipesBook.remove.should.have.been.called;

      done();
    });

    it('returns a 200 when delete succeeds', function (done) {
      recipesBookController.deleteRecipesBook(request, response);

      removeCallback(undefined, {});

      response.status.should.have.been.calledWith(200);
      response.end.should.have.been.called;

      done();
    });

    it('returns a 404 if the recipes book was not found', function (done) {
      recipesBookController.deleteRecipesBook(request, response);

      removeCallback();

      response.status.should.have.been.calledWith(404);
      response.end.should.have.been.called;

      done();
    });

    it('returns 500 if it fails to delete the recipes book', function (done) {
      var error = new Error('Inject error.');

      recipesBookController.deleteRecipesBook(request, response);

      removeCallback(error, undefined);

      response.status.should.have.been.calledWith(500);
      response.send.should.have.been.calledWith({reason: error.toString()})

      done();
    });
  });

  describe('the pre-load recipes book function', function () {
    var next;

    beforeEach(function (done) {
      next = sinon.spy();

      request.user = new TestUser(userId);

      recipesBookController.preLoadRecipesBook(request, response, next, recipesBookId);

      done();
    });

    it('tries to find a recipes book with the passed id', function (done) {
      findByIdId.should.equal(recipesBookId);

      done();
    });

    it('sets req.recipesBook to the recipes book with the passed id', function (done) {
      findByIdCallback(undefined, recipesBook);

      request.recipesBook.should.equal(recipesBook);

      done();
    });

    it('invokes the next function in the chain when everything succeeds', function (done) {
      findByIdCallback(undefined, recipesBook);

      next.should.have.been.called;

      done();
    });

    it('returns 404 when no recipes book is found for the passed id', function (done) {
      findByIdCallback(undefined, undefined);

      response.status.should.have.been.calledWith(404);
      response.send.should.have.been.calledWith({reason: 'Can\'t find recipes book.'});

      done();
    });

    it('returns 500 when a error occurs when trying to find the recipes book', function (done) {
      var error = new Error('Injected error');
      findByIdCallback(error, undefined);

      response.status.should.have.been.calledWith(500);
      response.send.should.have.been.calledWith({reason: error.toString()});

      done();
    });

    it('throws 403 if the user in the URI is not the owner of the recipes book', function (done) {
      request.user = new TestUser('some other id');

      findByIdCallback(undefined, recipesBook);

      response.status.should.have.been.calledWith(403);
      response.end.should.have.been.called;

      done();
    });
  });
});