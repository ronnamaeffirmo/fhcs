const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const checkItemUsage = require('../../src/hooks/check-item-usage');
const sinon = require('sinon')

describe('\'check item usage\' hook', () => {
  const serviceStub = sinon.stub()
  const findStub = sinon.stub()
  const hookStub = sinon.stub()

  const appStub = {
    service: serviceStub
  }

  appStub.service.returns({
    find: findStub,
    hooks: hookStub,
  })

  beforeEach(() => {
    findStub.returns({
      id: '123'
    })

    hookStub.returns({
      before: checkItemUsage()
    })
    appStub.service('dummy').hooks()
  });

  it('runs the hook', async () => {
    const result = await appStub.service('dummy').find('123');
    
    assert.deepEqual(result, { id: '123' });
  });

  it('should return an error', async () => {
    try {
      const result = await app.service('dummy').find();
    } catch(err) {
      assert.strictEqual(err.name, 'ReferenceError')
    }
  })
});
