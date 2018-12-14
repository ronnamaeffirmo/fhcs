const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const checkRoleUsage = require('../../src/hooks/check-role-usage');
const sinon = require('sinon')

describe('\'check role usage\' hook', () => {
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
      before: checkRoleUsage()
    })
    appStub.service('dummy').hooks()
  });

  it('runs the hook', async () => {
    const result = await appStub.service('dummy').find('123');
    
    assert.deepEqual(result, { id: '123' });
  });

  it('should return an error when parameter is empty', async () => {
    try {
      const result = await app.service('dummy').find();
    } catch(err) {
      assert.strictEqual(err.name, 'ReferenceError')
    }
  })
});