var HTML5  = require('html5')
  , should = require('should')
  , server = require('../../../server')
  , wd = require('wd')
  , mongoose = require('mongoose')
  , Account = mongoose.model('Account');

Account.find({
  userName: 'login'
}).exec(function (err, accounts) {
  if(accounts.length === 0) {
    Account.create({firstName: 'test', lastName: 'account', userName: 'login'});
  }
});

var browser = wd.remote();

// log status output from web driver
browser.on('status', function(info){
//  console.log('\x1b[36m%s\x1b[0m', info);
});

// log commands from web driver
browser.on('command', function(meth, path, data){
  console.log(' > \x1b[33m%s\x1b[0m: %s', meth, path, data || '');
});

var getBrowser = function () {
  return browser;
};

var World = function World(callback) {
  this.browser = browser;

  var page = function (path) {
    return "http://localhost:" + server.app.get('port') + path
  };

  this.visit = function (url, next) {
    this.browser.get(page(url), function (err, browser, status) {
      next(err, browser, status);
    });
  };

  // run the callback when we are done so cucumber knows we are ready
  this.browser.init({browserName: 'chrome'}, function() {
    callback();
  });
};

module.exports.World =  World;
module.exports.getBrowser = getBrowser;
