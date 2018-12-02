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
const removeStub = sinon.stub()

const appStub = {
  service: serviceStub
}

appStub.service.returns({
  create: createStub,
  update: updateStub,
  find: findStub,
  remove: removeStub
})

describe('\'items\' service', () => {
  const service = appStub.service('items')
  it('registered the service', () => {
    const service = app.service('items')

    assert.ok(service, 'Registered the service')
  })
  describe('create', () => {
    const item = {
      name: 'hollow blocks',
      quantity: '2',
      unit: 'pcs'
    }
    it('creates item to items service', async () => {
      createStub.returns(
        item
      )
      const result = await service.create()
      result.should.include({
        name: 'hollow blocks',
        quantity: '2',
        unit: 'pcs'
      })
    })
  })

  describe('remove', () => {
    const items = [{
      id: '12345',
      name: 'hollow blocks',
      quantity: '2',
      unit: 'pcs'
    },{
      id: '90909',
      name: 'Door Knobs',
      quantity: '5',
      unit: 'pcs'
    }]

    const removeData = {
      id: '12345',
      name: 'hollow blocks',
      quantity: '2',
      unit: 'pcs'
    }

    it('removes data in items collection', async () => {
      removeStub.returns(
        items.filter((inv) => inv.id !== removeData.id)
      )
      const result = await service.remove()
      result.length.should.be.equal(1)
    })
  })

  describe('update', () => {
    const item = {
      name: 'hollow blocks',
      quantity: '2',
      unit: 'pcs'
    }
    it('updates the quantity of item', async () => {
      const dataUpdate = {quantity: '10'}
      updateStub.returns(
        Object.keys(dataUpdate).map((res) => item[res] = dataUpdate[res] )
      )
      await service.update()
      item.quantity.should.be.equal('10')
    })
  })

  describe('find', () => {
    it('returns array of items', async () => {
      findStub.returns([{
        id: '12345',
        name: 'hollow blocks',
        quantity: '2',
        unit: 'pcs'
      },{
        id: '90909',
        name: 'Door Knobs',
        quantity: '5',
        unit: 'pcs'
      }])

      const result = await service.find()
      result.length.should.be.equal(2)
    })
  })
})
