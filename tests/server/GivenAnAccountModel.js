'use strict';

var should = require('chai').should(),
    sinon = require('sinon'),
    mongoose = require('mongoose');

var Account, account, repeatedAccount;

var accountParams = {
  firstName: 'FirstName',
  lastName: 'LastName',
  userName: 'account',
  email: 'test@test.com',
  password: 'password',
  provider: 'local'
};

before(function (done) {
  var config = require('../../server/config/config.js')['test'];

  require('../../server/config/mongo.js')(config);

  Account = mongoose.model('Account');

  done();
});

describe('The Account model', function () {
  before(function (done) {
    account = new Account(accountParams);

    repeatedAccount = new Account(accountParams);

    done();
  });

  describe('save', function () {
    it('should be able to save successfully', function (done) {
      account.save(done);
    });

    it('should fail to save an existing user again', function (done) {
      account.save();
      repeatedAccount.save(function (err) {
        err.should.exist;
        done();
      });
    });

    it('should fail to save the user without a firstName', function (done) {
      account.firstName = null;
      account.save(function (err) {
        account.firstName = accountParams.firstName;

        err.should.exist;
        err.errors.firstName.message.should.equal('Por favor, preencha o primeiro nome');
        done();
      });
    });

    it('should fail to save the user without a lastName', function (done) {
      account.lastName = null;
      account.save(function (err) {
        account.lastName = accountParams.lastName;

        err.should.exist;
        err.errors.lastName.message.should.equal('Por favor, preencha o sobrenome');
        done();
      });
    });

    it('should fail to save the user without a email', function (done) {
      account.email = null;
      account.save(function (err) {
        account.email = accountParams.email;

        err.should.exist;
        err.errors.email.message.should.equal('Por favor, preencha o email');
        done();
      });
    });

    it('should fail to save the user with an invalid email', function (done) {
      account.email = 'test.com';
      account.save(function (err) {
        account.email = accountParams.email;

        err.should.exist;
        err.errors.email.message.should.equal('Por favor, entre um email válido');
        done();
      });
    });

    it('should fail to save the user without a userName', function (done) {
      account.userName = null;
      account.save(function (err) {
        account.userName = accountParams.userName;

        err.should.exist;
        err.errors.userName.message.should.equal('Por favor, preencha o nome do usuário');
        done();
      });
    });

    it('should fail to save the user without a provider', function (done) {
      account.provider = null;
      account.save(function (err) {
        account.provider = accountParams.provider;

        err.should.exist;
        err.errors.provider.message.should.equal('Provider is required');
        done();
      });
    });

    it('should fail to save the user without a password', function (done) {
      account.password = null;
      account.save(function (err) {
        account.password = accountParams.password;

        err.should.exist;
        err.errors.password.message.should.equal('Password deve ter no mínimo 6 characteres');
        done();
      });
    });

    it('should skip password validation when provider is not local', function (done) {
      account.provider = 'not local';
      account.password = null;
      account.save(function (err) {
        account.password = accountParams.password;
        account.provider = accountParams.provider;

        should.not.exist(err);
        done();
      });
    });

    it('should set the salt property when saving the account', function (done) {
      account.save(function (err) {
        should.not.exist(err);

        account.salt.should.exist;

        done();
      });
    });

    it('should hash the password when saving the account', function (done) {
      var nonHashedPassword = account.password;
      account.save(function (err) {
        should.not.exist(err);

        account.password.should.equal(account.hashPassword(nonHashedPassword));

        done();
      });
    });
  });

  describe('authenticate', function () {
    it('should authenticate a user when passwords match', function (done) {
      var nonHashedPassword = account.password;
      account.save(function (err) {
        should.not.exist(err);

        account.authenticate(nonHashedPassword).should.beTrue;

        done();
      });
    });

    it('should fail to authenticate a user when passwords do not match', function (done) {
      account.save(function (err) {
        should.not.exist(err);

        account.authenticate('invalid password').should.beTrue;

        done();
      });
    });
  });

  after(function (done) {
    account.remove();
    done();
  });
});