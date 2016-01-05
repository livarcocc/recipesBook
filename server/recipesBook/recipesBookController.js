'use strict';

module.exports = function (RecipesBook) {
  return {
    recipesBookForUser: function (req, res) {
      req.recipesBook.populate('recipes', function (err, recipesBook) {
        if(err) {
          res.status(500);
          return res.send({reason: err.toString()});
        }

        res.send(recipesBook);
      });
    },
    recipesBooksForUser: function (req, res) {
      RecipesBook.find({owner: req.user._id}).populate('recipes', '_id name').exec(function (err, collection) {
        res.send(collection);
      });
    },
    createRecipesBook: function (req, res) {
      var newRecipesBook = req.body;

      newRecipesBook.owner = req.user._id;

      RecipesBook.create(newRecipesBook, function (err, recipesBook) {
        if(err) {
          res.status(400);
          return res.send({reason: err.toString()});
        }

        res.send(recipesBook);
      });
    },
    updateRecipesBook: function (req, res) {
      if(!req.body || !req.body.name) {
        res.status(400);
        return res.send({reason: 'Missing recipes book name.'})
      }

      req.recipesBook.name = req.body.name;
      req.recipesBook.save(function (err) {
        if(err)
        {
          res.status(500);
          return res.send({reason: err.toString()});
        }

        res.send(req.recipesBook);
      });
    },
    deleteRecipesBook: function (req, res) {
      req.recipesBook.remove(function (err, recipesBook) {
        if(err) {
          res.status(500);
          return res.send({reason: err.toString()});
        }

        if(!recipesBook) {
          res.status(404);
          return res.end();
        }

        res.status(200);
        return res.end();
      });
    },
    preLoadRecipesBook: function (req, res, next, id) {
      RecipesBook.findById(id, function (err, recipesBook) {
        if(err) {
          res.status(500);
          return res.send({reason: err.toString()});
        }

        if(!recipesBook) {
          res.status(404);
          return res.send({reason: 'Can\'t find recipes book.'});
        }

        if(!recipesBook.owner.equals(req.user._id))
        {
          res.status(403);
          return res.end();
        }

        req.recipesBook = recipesBook;

        return next();
      });
    }
  };
};