// inventories-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const inventories = new Schema({
    workers: [{ type: String, required: true }],
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true },
    source: { type: String, enum: ['delivery', 'output'], required: true },
    producer: { type: String, required: true },
    poNumber: { type: String, required: true },
    company: { type: String, required: true },
    truckPlateNumber: { type: String, required: true },
    status: { type: String, enum: ['received', 'in_transit', 'returned'], required: true },
    notes: { type: String, required: true },
    receivedBy: [{ type: String, required: true }]

    // old
    // itemId: { type: String, required: true },
    // quantity: { type: Number, required: true },
    // encoder: { type: String, require: true },
  }, {
    timestamps: true
  })

  return mongooseClient.model('inventories', inventories)
}
