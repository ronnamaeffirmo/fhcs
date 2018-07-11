// item-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const item = new Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    unit: { type: String, enum: ['kg', 'cubic', 'pcs'] } // FIXME: separate file?
  }, {
    timestamps: true,
    versionKey: false
  });

  return mongooseClient.model('item', item);
};
