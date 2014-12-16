var sharedSteps = function(){
  this.World = require('../support/world').World;

  this.Given(/^I am on the home page$/, function(next) {
    this.visit('/', next);
  });

  this.Then(/^I should see "([^"]*)" at the "([^"]*)"$/, function(text, location, next) {
    this.browser.elementByCss('body', function (err, el) {
      if(err)
      {
        next.fail();
      }
      else
      {
        if(text !== '')
        {
          el.text(function (err, actualText) {
            if (err)
            {
              next.fail();
            }
            else
            {
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

  this.Then(/^I should see a "([^"]*)"$/, function(location, next) {
    this.browser.elementByCss(location, function (err) {
      if(err)
      {
        next.fail();
      }
      else
      {
        next();
      }
    });
  });
};

module.exports = sharedSteps;