const assert = require('assert')
const app = require('../../src/app')
const describe = require('mocha').describe
const it = require('mocha').it
const sinon = require('sinon')
const should = require('chai').should()


const serviceStub = sinon.stub()
const createStub = sinon.stub()
const updateStub = sinon.stub()
const findStub = sinon.stub()

const appStub = {
  service: serviceStub
}

appStub.service.returns({
  create: createStub,
  update: updateStub,
  find: findStub,
})

describe('\'users\' service', () => {
  const dummyUser = {
    username: 'user111',
    firstname: 'fire111',
    lastname: 'last111',
    address: 'somewhere',
    password: 'secret'
  }

  it('registered the service', () => {
    const service = app.service('users')

    assert.ok(service, 'Registered the service')
  })

  describe('retrieveUsers', () => {
    it('returns array of users', async () => {
      const service = appStub.service('users')
      findStub.returns([ {
        username: 'user111',
        firstname: 'fire111',
        lastname: 'last111',
        address: 'somewhere',
        password: 'secret'
      }, {
        username: 'user123',
        firstname: 'fire123',
        lastname: 'last123',
        address: 'Iloilo',
        password: 'pass123'
      }
      ])
      const results = await service.find()
      results.length.should.be.equal(2)
    })
  })

  describe('update', () => {
    it('updates the username', async () => {
      const service = appStub.service('users')
      const dataUpdate = {username: 'user123'}
      updateStub.returns(
        Object.keys(dataUpdate).map((res) => dummyUser[res] = dataUpdate[res] )
      )
      const result = await service.update()
      dummyUser.username.should.be.equal('user123')
    })
    it('updates the password', async () => {
      const service = appStub.service('users')
      const dataUpdate = {password: 'pass123'}
      updateStub.returns(
        Object.keys(dataUpdate).map((res) => dummyUser[res] = dataUpdate[res] )
      )
      const result = await service.update()
      dummyUser.password.should.be.equal('pass123')
    })
    it('updates multiple fields', async () => {
      const service = appStub.service('users')
      const dataUpdate = {username: 'user123', password: 'pass123', firstname: 'joe'}
      updateStub.returns(
        Object.keys(dataUpdate).map((res) => dummyUser[res] = dataUpdate[res] )
      )
      const result = await service.update()
      dummyUser.username.should.be.equal('user123')
      dummyUser.password.should.be.equal('pass123')
      dummyUser.firstname.should.be.equal('joe')
    })
  })

  
  describe('create', () => {
    const dummyUser = {
      username: 'user111',
      firstname: 'fire111',
      lastname: 'last111',
      address: 'somewhere',
      password: 'secret'
    }
    
    it('creates user', async () => {
      const service = appStub.service('users')
      createStub.returns(
        dummyUser
      )
      const result = await service.create()
      result.should.be.instanceof(Object)
    })

    it('show no error when there are no missing fields', async () => {
      const service = appStub.service('users')
      createStub.returns(
        dummyUser
      )
      const result = await service.create()
      result.username.should.have.string('user111')
      result.firstname.should.have.string('fire111')
      result.lastname.should.have.string('last111')
      result.address.should.have.string('somewhere')
      result.password.should.have.string('secret')
    })

    it('shows bad-request error when validation failed', async () => {
      const service = app.service('users')
      return await service.create({
        email: 'bla@gmail.com',
        password: 'secret'
      })
      .catch((err) => {
        assert.equal(err.className, 'bad-request')
      })
    })
  })
})


