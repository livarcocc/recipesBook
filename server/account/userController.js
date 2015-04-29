'use strict';

module.exports = function (User) {
  return {
    users: function (req, res) {
      User.find({}).exec(function(err, collection) {
        res.send(collection);
      });
    }
  };
};