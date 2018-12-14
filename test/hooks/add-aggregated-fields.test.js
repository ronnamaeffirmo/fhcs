const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const addAggregatedFields = require('../../src/hooks/add-aggregated-fields');
const should = require('chai').should()

describe('\'addAggregatedFields\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      after: addAggregatedFields()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    assert.deepEqual(result, { id: 'test' });
  });
  it('should return an error', async () => {
    // assert.throws(result, expected)
    try {
      const result = await app.service('dummy').get();
    } catch(err) {
      assert.strictEqual(err.name, 'Error')
    }
  })
});
