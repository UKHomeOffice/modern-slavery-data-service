'use strict';

module.exports = {
  query: {
    mixin: 'radio-group',
    options: [
      'session',
      'email'
    ],
    validate: 'required'
  },
  session: {
    validate: 'required'
  },
  email: {
    validate: ['required', 'email']
  }
};
