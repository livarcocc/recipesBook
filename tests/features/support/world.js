var HTML5  = require('html5')
  , should = require('should')
  , server = require('../../../server')
  , wd = require('wd');

var browser = wd.remote();

// log status output from web driver
browser.on('status', function(info){
  console.log('\x1b[36m%s\x1b[0m', info);
});

// log commands from web driver
browser.on('command', function(meth, path, data){
  console.log(' > \x1b[33m%s\x1b[0m: %s', meth, path, data || '');
});

module.exports = function() {
  this.World = function World(callback) {
    this.browser = browser;

    this.page = function (path) {
      return "http://localhost:" + server.app.get('port') + path
    };

    this.visit = function (url, callback) {
      this.browser.get(this.page(url), function (err, browser, status) {
        callback(err, browser, status);
      });
    };

    // run the callback when we are done do cucumber knows we are ready
    this.browser.init({browserName: 'chrome'}, function() {
      callback();
    });
  }
};