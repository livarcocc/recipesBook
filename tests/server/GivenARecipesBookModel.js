'use strict';

var should = require('chai').should(),
  sinon = require('sinon'),
  mongoose = require('mongoose');

var RecipesBook, Account, recipesBook, existingAccount;

var accountParams = {
  firstName: 'FirstName',
  lastName: 'LastName',
  userName: 'recipesBookOwner',
  email: 'recipesBookOwner@test.com',
  password: 'password',
  provider: 'local'
};

describe('The RecipesBook model', function () {
  before(function (done) {
    RecipesBook = mongoose.model('RecipesBook');
    Account = mongoose.model('Account');

    Account.findOne({userName: accountParams.userName}, function (err, account) {
      if(err || account === undefined)
      {
        existingAccount = new Account(accountParams);

        existingAccount.save(done);
      }
      else {
        existingAccount = account;

        done();
      }
    });
  });

  it('validates that the name is present', function (done) {
    recipesBook = new RecipesBook({name: ''});

    recipesBook.save(function (err) {
      err.should.exist;

      done();
    });
  });

  it('validates that a user is present', function (done) {
    recipesBook = new RecipesBook({name: 'any cookbook name'});

    recipesBook.save(function (err) {
      err.should.exist;

      done();
    });
  });

  it('can create a recipes book for a user', function (done) {
    recipesBook = new RecipesBook({name: 'any cookbook name', owner: existingAccount._id});

    recipesBook.save(function (err) {
      should.not.exist(err);

      done();
    });
  });
});