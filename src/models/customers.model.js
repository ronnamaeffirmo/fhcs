// customers-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const customers = new Schema({
    name: { type: 'String', required: true },
    address: { type: 'String', required: true },
    phone: { type: 'String', required: true },
    company: { type: 'String' }
  }, {
    timestamps: true,
    versionKey: false
  })

  return mongooseClient.model('customers', customers)
}
