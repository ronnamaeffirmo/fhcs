const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const checkRoleUsage = require('../../src/hooks/check-role-usage');

describe('\'check role usage\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: checkRoleUsage()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
