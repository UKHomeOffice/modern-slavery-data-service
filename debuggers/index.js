'use strict';

const debug = require('debug');

const globalNamespace = 'data-service';

const database = debug(`${globalNamespace}:database`);

const server = debug(`${globalNamespace}:server`);

/**
 * The debug module has a namespace feature that allows you to enable or disable debug functions in groups.
 *
 * i.e:
 * debug('app:meta')('config loaded')
 * debug('app:database')('querying db...');
 * debug('app:database')('got results!', results);
 *
 * The following would enable the database debug function but not config
 * DEBUG='app:database' node index.js
 */
module.exports = {
  database,
  server,
};
