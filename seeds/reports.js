'use strict';

// eslint-disable-next-line func-names
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('reports').del()
    // eslint-disable-next-line func-names
    .then(function() {
      // Inserts seed entries
      return knex('reports').insert([
        {id: 1, email: 'dev@testing.com', session: '{escaped json object}'},
        {id: 2, email: 'dev@test.com', session: '{escaped json object}'}
      ]);
    });
};
