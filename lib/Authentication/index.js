'use strict';

const util = require('util');
const DebugDB = require('../../debuggers').server;
const config = require('../../config');

/**
 * Check if supplied authorisation key in the request object is valid against the list of valid authorisation keys
 *
 * @returns {void}
 */
function isAuthorised(req, res, next) {
  const valid = config.apiKeys.some(({key, user})=> {
    if (key === req.authorization.basic.password
      && user === req.authorization.basic.username) {
        return true;
    }

    return false;
  });

  if (valid) {
    next();
  } else {
    res.send(401, new Error('Not authenticated'));
    DebugDB('Failed authentication check: ' + util.inspect(req.authorization));
    next(false);
  }
}

/**
 * Authenticate API Key used to connect to service
 *
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function to be called
 *
 * @returns {void}
 */
function authenticateAPIKey(req, res, next) {
  // Check if a key is available
  if (req.authorization && req.authorization.basic) {
    // Check if key is valid
    isAuthorised(req, res, next);
  } else {
    res.send(400, new Error('No Authorization Key'));
    DebugDB('NO AUTHORISATION');
    next(false);
  }
}

module.exports = {
  authenticateAPIKey,
};
