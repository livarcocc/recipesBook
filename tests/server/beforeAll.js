'use strict';

before(function (done) {
  var config = require('../../server/config/config.js')['test'];

  require('../../server/config/mongo.js')(config);

  done();
});