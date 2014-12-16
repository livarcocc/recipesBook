var sharedSteps = module.exports = function(){
  this.World = require('../support/world');

  this.Given(/^I am on the home page$/, function(next) {
    this.visit('/', next);
  });

  this.Then(/^I should see "([^"]*)"$/, function(text, next) {
    this.browser.elementByCss('body', function (err, el) {
      el.text(function(err, actualText) {
        actualText.should.containEql(text);
        next();
        this.browser.quit();
      });
    });
  });
}