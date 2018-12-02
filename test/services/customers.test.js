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


describe('\'customers\' service', () => {
  it('registered the service', () => {
    const service = app.service('customers')
    assert.ok(service, 'Registered the service')
  })
  describe('find', () => {
    it('returns array of customers', async () => {
      const service = appStub.service('customers')
      findStub.returns([ {
        username: 'user111',
        firstame: 'joe',
        lastname: 'last111',
        address: 'somewhere',
      },
    ])
    const results = await service.find()
    results.length.should.be.equal(1)
    })
  })
  describe('create', () => {
    const dummyCustomer = {
      username: 'user111',
      firstame: 'joe',
      lastname: 'Johnson',
      address: 'somewhere',
    }
    it('creates user', async () => {
      const service = appStub.service('customers')
      createStub.returns(
        dummyCustomer
      )
      const result = await service.create()
      result.should.be.instanceof(Object)
    })
  })
  describe('remove', () => {
    it('removes data from customers collection', async () => {
      const customers = [ {
        id: '123',
        username: 'user111',
        firstame: 'Mai',
        lastname: 'Bonifacio',
        address: 'Cebu',
      },
      {
        id: '321',
        username: 'user214',
        firstame: 'Joe',
        lastname: 'Rizal',
        address: 'Manila',
      }]
      
      const removeData = {
        id: '321',
      }
  
      removeStub.returns(
        customers.filter((customer) => customer.id !== removeData.id)
      )
      const service = appStub.service('customers')
      const res = await service.remove()
      res.length.should.be.equal(1)
    })
  })
})