'use strict';

var mongoose = require('mongoose');

module.exports = function () {
  var recipesBookSchema = mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true
    },
    recipes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
    }]
  });

  mongoose.model('RecipesBook', recipesBookSchema);
};