const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const populateItemReportFields = require('../../src/hooks/populate-item-report-fields');
const sinon = require('sinon')

describe('\'populate item report fields\' hook', () => {
  let app;
  const serviceStub = sinon.stub()
  const findStub = sinon.stub()
  const hookStub = sinon.stub()
  const modelStub = sinon.stub()

  const appStub = {
    service: serviceStub
  }

  appStub.service.returns({
    find: findStub,
    hooks: hookStub,
    Model: modelStub,
  })

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });


    appStub.service('dummy').hooks({
      after: populateItemReportFields()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    assert.deepEqual(result, { id: 'test' });
  });

  it('should return an error when parameter is empty', async () => {
    try {
      const result = await app.service('dummy').get();
    } catch(err) {
      assert.strictEqual(err.name, 'Error')
    }
  })
});
