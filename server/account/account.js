var mongoose = require('mongoose'),
    crypto = require('crypto');

//TODO-licavalc: Add localization on the required messages
//TODO-licavalc: Consider adding different providers capabilities

var validateLocalStrategyPassword = function(password) {
//  return (this.provider !== 'local' ||
  return this.provider !== 'local' || (password && password.length > 6);
};

module.exports = function () {
  var accountSchema = mongoose.Schema({
    firstName: {
      type: String,
      trim: true,
      required: 'Por favor, preencha o primeiro nome'
    },
    lastName: {
      type: String,
      trim: true,
      required: 'Por favor, preencha o sobrenome'
    },
    displayName: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      required: 'Por favor, preencha o email',
      match: [/.+\@.+\..+/, 'Por favor, entre um email válido']
    },
    userName: {
      type: String,
      trim: true,
      unique: true,
      required: 'Por favor, preencha o nome do usuário'
    },
    password: {
      type: String,
      validate: [validateLocalStrategyPassword, 'Password deve ter no mínimo 6 characteres']
    },
    salt: {
      type: String
    },
    provider: {
      type: String,
      required: 'Provider is required'
    }
  });

  accountSchema.pre('save', function (next) {
    if(this.password && this.password.length > 6) {
      this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
      this.password = this.hashPassword(this.password);
    }

    next();
  });

  accountSchema.methods.hashPassword = function (password) {
    if(this.salt && password) {
      return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
    }
    else {
      return password;
    }
  };

  accountSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
  };

  mongoose.model('Account', accountSchema);
};