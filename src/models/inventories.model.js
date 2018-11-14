// inventories-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const inventories = new Schema({
    itemId: { type: String, required: true },
    quantity: { type: Number, required: true },
    encoder: { type: String, require: true },
    source: { type: String, enum: ['delivery', 'output'] }
  }, {
    timestamps: true
  })

  return mongooseClient.model('inventories', inventories)
}
