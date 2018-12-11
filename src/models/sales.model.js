// sales-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const {Schema} = mongooseClient
  const sales = new Schema({
    customer: {type: Schema.Types.ObjectId, ref: 'customers', required: true},
    date: {type: Date, required: true},
    term: {type: Number, required: true},
    discount: {type: Number, default: 0.0},
    officialReceipt: {type: String, required: true, unique: true},
    remarks: {type: String},
    status: {type: String, enum: ['unpaid', 'paid', 'promised'], default: 'unpaid'},
    items: [{
      item: {type: Schema.Types.ObjectId, ref: 'items', required: true},
      price: {type: Number, required: true},
      quantity: {type: Number, required: true},
      returnQuantity: {type: Number, default: 0.0},
      discount: {type: Number, default: 0.0}
    }]
  }, {
    timestamps: true,
    versionKey: false
  })

  return mongooseClient.model('sales', sales)
}
