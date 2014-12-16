var browser = require('./world.js').getBrowser();

var myAfterHooks = function () {
  this.registerHandler('AfterFeatures', function (event, callback) {
    browser.quit(function() {
      //HACK: kills cucumber when we are done. For some reason, WD is not closing even when we call browser.quit
      process().kill();
    });
    callback();
  });
};

module.exports = myAfterHooks;