// sales-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const sales = new Schema({
    customer: String,
    dateFrom: String,
    dateTo: String,
    discount: Number,
    grandTotal: Number,
    invoiceNumber: String,
    itemLists: [],
    quantity: String,
    remarks: String,
    terms: String
  }, {
    timestamps: true,
    versionKey: false
  })

  return mongooseClient.model('sales', sales)
}
