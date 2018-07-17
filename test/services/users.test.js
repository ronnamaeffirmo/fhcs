const assert = require('assert')
const app = require('../../src/app')
const describe = require('mocha').describe
const it = require('mocha').it

describe('\'users\' service', () => {
  it('registered the service', () => {
    const service = app.service('users')

    assert.ok(service, 'Registered the service')
  })
})
