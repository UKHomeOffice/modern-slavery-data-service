'use strict';
const {isAuthorisationKeyValid} = require('../../../../lib/Authentication/util/check-authorisation-key');

describe('lib/Authentication/util/check-authorisation-key.js', () => {
  it('should return true if supplied credentials are valid', () => {
    const expected = true;

    const inputs = {
      validAuthenticationCredentials: {
        key: 'password',
        user: 'exampleUser'
      },
      req: {
        authorization: {
          basic: {
            password: 'password',
            username: 'exampleUser',
          }
        }
      },
    };

    const result = isAuthorisationKeyValid(inputs.validAuthenticationCredentials, inputs.req);

    expect(result).to.equal(expected);
  });
});
