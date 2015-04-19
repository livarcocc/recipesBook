var sharedSteps = function () {
  this.World = require('../support/world').World;

  this.Given(/^I am on the home page unauthenticated$/, function (next) {
    this.visit('/', next);
    //TODO-licavalc: deal with the authenticated/unauthenticated part of the step
  });

  this.Then(/^I should see "([^"]*)" at the "([^"]*)"$/, function (text, location, next) {
    this.browser.elementByCss(location, function (err, el) {
      if (err) {
        next.fail();
      }
      else {
        if (text !== '') {
          el.text(function (err, actualText) {
            if (err) {
              next.fail();
            }
            else {
              actualText.should.containEql(text);
              next();
            }
          });
        }
        else {
          next();
        }
      }
    });
  });

  this.Then(/^I should (not )?see an element "([^"]*)"$/, function (negate, location, next) {
    this.browser.elementByCss(location, function (err) {
      if (negate && !err) {
        console.log('LOCATION: ' + location);

        next.fail();
      }
      else if (err) {
        next.fail();
      }
      else {
        next();
      }
    });
  });

  this.Then(/^I have entered "([^"]*)" at "([^"]*)"$/, function (value, location, next) {
    this.browser.elementByCss(location, function (err, el) {
      if (err) {
        next.fail();
      }
      else {
        el.click(function () {
          el.sendKeys(value, function () {
            next();
          });
        });
      }
    });
  });

  this.Then(/^I click "([^"]*)"$/, function (location, next) {
    this.browser.elementByCss(location, function (err, el) {
      if (err) {
        next.fail();
      }
      else {
        el.click(function () {
          next();
        });
      }
    });
  });

  this.Then(/^I am sent to "([^"]*)" page$/, function (path, next) {
    this.browser.eval("window.location.href", function(err, href) {
      if (err) {
        next.fail();
      }
      else {
        console.log('URL:' + href);
        if(href.indexOf(path) !== -1) {
          next();
        }
        else {
          next.fail();
        }
      }
    });
  });
};

module.exports = sharedSteps;