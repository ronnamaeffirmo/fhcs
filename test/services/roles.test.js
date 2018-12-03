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

describe('\'roles\' service', () => {
  const service = appStub.service('roles')
  it('registered the service', () => {
    const service = app.service('roles')

    assert.ok(service, 'Registered the service')
  })
  describe('create', () => {
    role = {
      userId: '12345',
      owner: true
    }
    it('creates role to roles service', async () => {
      createStub.returns(
        role
      )
      const result = await service.create()
      result.should.include({
        userId: '12345',
        owner: true
      })
    })
  })

  describe('remove', () => {
    const roles = [{
      userId: '12345',
      owner: true
    },{
      userId: '54321',
      owner: false
    }]

    const removeData = {
      userId: '54321',
      owner: false,
    }

    it('removes data in roles collection', async () => {
      removeStub.returns(
        roles.filter((res) => res.userId !== removeData.userId)
      )
      const result = await service.remove()
      result.length.should.be.equal(1)
    })
  })

  describe('find', () => {
    it('returns array of roles', async () => {
      findStub.returns([{
        userId: '12345',
        owner: true
      },{
        userId: '54321',
        owner: false
      }])

      const result = await service.find()
      result.length.should.be.equal(2)
    })
  })
})
