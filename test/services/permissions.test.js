const assert = require('assert')
const app = require('../../src/app')
const sinon = require('sinon')
const should = require('chai').should()

const serviceStub = sinon.stub()
const createStub = sinon.stub()
const findStub = sinon.stub()
const removeStub = sinon.stub()

const appStub = {
  service: serviceStub
}

appStub.service.returns({
  create: createStub,
  find: findStub,
  remove: removeStub
})

describe('\'permissions\' service', () => {
  const service = appStub.service('permissions')
  it('registered the service', () => {
    const service = app.service('permissions')

    assert.ok(service, 'Registered the service')
  })
  describe('create', () => {
    permission = {
      id: '12345'
    }
    it('creates permission to permissions service', async () => {
      createStub.returns(
        permission
      )
      const result = await service.create()
      result.should.include({
        id: '12345'
      })
    })
  })

  describe('remove', () => {
    const permissions = [{
      id: '12345',
    },{
      id: '90909',
    }]

    const removeData = {
      id: '12345',
    }

    it('removes data in permissions collection', async () => {
      removeStub.returns(
        permissions.filter((inv) => inv.id !== removeData.id)
      )
      const result = await service.remove()
      result.length.should.be.equal(1)
    })
  })

  describe('find', () => {
    it('returns array of permissions', async () => {
      findStub.returns([{
        id: '12345',
      },{
        id: '90909',
      }])

      const result = await service.find()
      result.length.should.be.equal(2)
    })
  })
})
