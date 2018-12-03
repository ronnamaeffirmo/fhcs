const assert = require('assert')
const app = require('../../src/app')
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

describe('\'sales\' service', () => {
  const service = appStub.service('sales')
  it('registered the service', () => {
    const service = app.service('sales')

    assert.ok(service, 'Registered the service')
  })
  describe('create', () => {
    const sale = {
      total: '1500',
      items: [{
        name: 'hollow blocks',
        quantity: '2',
        unit: 'pcs'
      },
      {
        name: 'hollow blocks',
        quantity: '2',
        unit: 'pcs'
      }]
    }
    it('creates item to sales service', async () => {
      createStub.returns(
        sale
      )
      const result = await service.create()
      result.should.include({
        total: '1500',
      })
    })
  })

  describe('remove', () => {
    const sales = [{
      id: '123',
      total: '1500',
      items: [{
        name: 'hollow blocks',
        quantity: '2',
        unit: 'pcs'
      },
      {
        name: 'Cement',
        quantity: '100',
        unit: 'pcs'
      }]
    }, {
      id: '122',
      total: '1500',
      items: [{
        name: 'Door Knobs',
        quantity: '2',
        unit: 'pcs'
      },
      {
        name: 'hollow blocks',
        quantity: '2',
        unit: 'pcs'
      }]
    }]

    const removeData = {
      id: '123',
      total: '1500',
      items: [{
        name: 'hollow blocks',
        quantity: '2',
        unit: 'pcs'
      },
      {
        name: 'Cement',
        quantity: '100',
        unit: 'pcs'
      }]
    }

    it('removes data in sales collection', async () => {
      removeStub.returns(
        sales.filter((inv) => inv.id !== removeData.id)
      )
      const result = await service.remove()
      result.length.should.be.equal(1)
    })
  })

  describe('update', () => {
    const sale = {
      total: '1500',
      items: [{
        name: 'hollow blocks',
        quantity: '500',
        unit: 'pcs'
      },
      {
        name: 'Cement',
        quantity: '100',
        unit: 'pcs'
      }]
    }
    it('updates the quantity of sale', async () => {
      const dataUpdate = { total: '3000' }
      updateStub.returns(
        Object.keys(dataUpdate).map((res) => sale[res] = dataUpdate[res])
      )
      await service.update()
      sale.total.should.be.equal('3000')
    })
  })

  describe('find', () => {
    it('returns array of sales', async () => {
      findStub.returns([{
        total: '1500',
        items: [{
          name: 'hollow blocks',
          quantity: '500',
          unit: 'pcs'
        },
        {
          name: 'Cement',
          quantity: '100',
          unit: 'pcs'
        }]
      }, {
        total: '1500',
        items: [{
          name: 'hollow blocks',
          quantity: '500',
          unit: 'pcs'
        },
        {
          name: 'Cement',
          quantity: '100',
          unit: 'pcs'
        }]
      }])

      const result = await service.find()
      result.length.should.be.equal(2)
    })
  })
})
