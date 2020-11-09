'use strict';

const result = require('./behaviours/result');


module.exports = {
  name: 'ms-lookup',
  baseUrl: '/',
  steps: {
    '/type-of-query': {
      fields: ['query'],
      forks: [{
        target: '/session',
        condition: {
          field: 'query',
          value: 'session'
        }
      }, {
        target: '/email',
        condition: {
          field: 'query',
          value: 'email'
        }
      }]
    },
    '/session': {
      fields: ['session'],
      next: '/result'
    },
    '/email': {
      fields: ['email'],
      next: '/result'
    },
    '/result': {
      behaviours: [result, 'complete'],
      next: '/'
    }
  }
};
