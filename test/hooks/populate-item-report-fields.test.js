const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const populateItemReportFields = require('../../src/hooks/populate-item-report-fields');

describe('\'populate item report fields\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      after: populateItemReportFields()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
