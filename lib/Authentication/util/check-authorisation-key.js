'use strict';

/**
 * Check if the supplied authorisation key is valid
 *
 * @param {object} validAuthenticationCredentials - object containing a valid user and key pair
 * @param {object} req - request object (containing supplied credentials)
 */
function isAuthorisationKeyValid({key, user}, req) {
  if (key === req.authorization.basic.password
    && user === req.authorization.basic.username) {
      return true;
  }

  return false;
}

module.exports = {
  isAuthorisationKeyValid,
};
