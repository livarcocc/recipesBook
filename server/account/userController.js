'use strict';

module.exports = function (User) {
  return {
    users: function (req, res) {
      User.find({}).exec(function(err, collection) {
        res.send(collection);
      });
    },
    createUser: function (req, res, next) {
      var newUser = req.body;

      newUser.DisplayName = newUser.firstName + ' ' + newUser.lastName;
      newUser.userName = newUser.email;
      newUser.provider = 'local';

      User.create(newUser, function (err, user) {
        if(err) {
          res.status(400);
          return res.send({
            reason: err.toString()
          });
        }

        user.password = undefined;
        user.salt = undefined;

        req.logIn(user, function (err) {
          if(err) {
            next(err);
          }

          res.send(user);
        });
      });
    }
  };
};