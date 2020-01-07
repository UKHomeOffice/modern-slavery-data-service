'use strict';
const Model = require('../../models/data-service-postgresql');

describe('/modern-slavery-data-service/lib/models/data-service-postgresql.js', () => {
  let instance;

  describe('write()', () => {
    beforeEach(() => {
      instance = Model;
      sinon.stub(Model, 'write');
    });

    afterEach(() => {
      Model.write.restore();
    });

    it('should not throw an error when there are no issues found whilst writing to database', async() => {
      try {
        instance.write.returns(() => null);

        const result = await instance.write();

        expect(result).to.not.throw();
      } catch (err) {
          throw err;
      }
    });

    it('should throw an error if there is an issue when attempting to write to database', async() => {
      try {
        instance.write.returns(() => {
          throw new Error();
        });

        const result = await instance.write();

        expect(result).to.throw();
      } catch (err) {
          throw err;
      }
    });
  });
});
