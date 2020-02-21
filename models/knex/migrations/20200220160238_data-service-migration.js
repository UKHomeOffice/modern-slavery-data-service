/* eslint-disable filenames/match-regex */
'use strict';

module.exports.up = (knex) => {
  return knex.schema.createTable('reports', (tableReference) => {
    tableReference.increments('id').unsigned().primary();
    tableReference.dateTime('createdAt').notNull();
    tableReference.dateTime('updatedAt').nullable();
    tableReference.dateTime('deletedAt').nullable();

    tableReference.string('user_email').notNull();
    tableReference.string('json_saved_data').nullable();
    tableReference.string('visited_pages').nullable();
});
};

module.exports.down = (knex) => {
  return knex.schema.dropTable('reports');
};
