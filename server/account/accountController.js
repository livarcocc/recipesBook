'use strict';

module.exports = function (passport) {
  return {
    signin: function (req, res, next) {
      passport.authenticate('local', function (err, user, info) {
        if (err || !user) {
          res.status(400).send(info);
        }
        else {
          user.password = undefined;
          user.salt = undefined;

          req.login(user, function (err) {
            if (err) {
              res.status(400).send(err);
            }
            else {
              res.json({data: user});
            }
          });
        }
      })(req, res, next);
    },
    signout: function (req, res) {
      req.logout();
      res.end();
    }
  };
};

