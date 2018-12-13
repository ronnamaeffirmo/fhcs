// items-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const items = new Schema({
    code: String,
    name: String,
    description: String,
    price: Number,
    unit: { type: String, enum: ['kg', 'cubic', 'pc', 'liter', 'bag', 'gross'] }
  }, {
    timestamps: true,
    versionKey: false
  })

  return mongooseClient.model('items', items)
}
