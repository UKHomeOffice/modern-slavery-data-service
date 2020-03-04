/* eslint-disable filenames/match-regex */
'use strict';

module.exports.up = (knex) => {
 return knex.schema.createTable('save_report_tokens', (tableReference) => {
   tableReference.increments('id').unsigned().primary();
   tableReference.dateTime('created').notNull();
   tableReference.string('uuid').notNull();
   tableReference.string('useremail').notNull();
 });
};

module.exports.down = (knex) => {
 return knex.schema.dropTable('save_report_tokens');
};
